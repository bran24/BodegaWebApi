
import { Response, Request } from 'express'

import { AppDataSource } from '../index'

import { createVentasInteractor, deleteVentasInteractor } from '../core/interactor/ventas';
import { Cliente, DetalleVenta, MetodoPago, MovimientoInventario, Pago, Producto, TipoComprobante, Usuario, Ventas } from '../core/entities';
import { plainToInstance } from 'class-transformer';
import { DetalleVentaDto } from '../core/validators/detalleVenta.dto';
import { validate, validateOrReject } from 'class-validator';
import { TipoMovimiento } from '../core/entities/movimientoInventario';
import { MercadoPagoConfig, Order, Preference, Payment } from "mercadopago"
import { mpClient } from '../utils/mercadopago';
import { ILike } from 'typeorm';
export const createVentas = async (req: Request, res: Response): Promise<Response> => {

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {
        const { dataVenta,dataMercadoPago } = req.body

        console.log('ss',dataMercadoPago)
     


        const {  clienteid, usuarioid, tipo_comprobanteid, observacion, detalleVentas, pago, facturar} = dataVenta


        const cliente = await queryRunner.manager.findOne(Cliente, { where: { id: clienteid } })
        const usuario = await queryRunner.manager.findOne(Usuario, { where: { id: usuarioid } });


        if (!cliente || !usuario) {
            return res.status(400).json({ message: "Faltan datos válidos para registrar la venta" })
        }




        for (const item of detalleVentas) {
            const detalleDto = plainToInstance(DetalleVentaDto, item)
            const errors = await validate(detalleDto)

            if (errors.length > 0) {
                const mensajes = errors.map(err => Object.values(err.constraints || {})).flat();
                return res.status(400).json({ message: "Error en detalle de venta", errors: mensajes });
            }




        }



        let subtotal = 0;
        let igv = 0;
        let total = 0;

        const productosMap = new Map<number, Producto>();

        for (const item of detalleVentas) {

            const productoven = await queryRunner.manager.findOne(Producto, { where: { id: item.productoid } });

            if (!productoven) {
                return res.status(400).json({ message: 'Producto no encontrado' });
            }


            if (productoven.cantidad < item.cantidad) {
                return res.status(400).json({ message: `Stock insuficiente para ${productoven.nombre}` });
            }

            productosMap.set(item.productoid, productoven)


            const precio = Number(item.precio_unitario);
            const cantidad = Number(item.cantidad);
            const sub = precio * cantidad;
            subtotal += sub;


            if (productoven.afecta_igv) {
                igv += sub * 0.18;
            }






        }
        total = subtotal + igv;
        let metodoPago = await queryRunner.manager.findOne(MetodoPago, { where: { id: pago.metodoPagoid } })


         if (!metodoPago) {
            return res.status(400).json({ message: "Metodo de pago no existe" })
                  }

        


        
        
        
        let estado = 'PENDIENTE'

        if (facturar) {


            estado = 'FACTURADO'

        }








        const tipoComprobante = await queryRunner.manager.findOne(TipoComprobante, { where: { id: tipo_comprobanteid } })

        if (!tipoComprobante) {
            return res.status(400).json({ message: "Faltan datos válidos para registrar la venta" })
        }



        const ultimaventa = await queryRunner.manager.findOne(Ventas, {
            where: { tipo_comprobante: { id: tipo_comprobanteid } },
            order: { numero: "DESC" }
        })

        let sgtventa = 1
        if (ultimaventa?.numero != null) {

            sgtventa = ultimaventa.numero + 1
        }


        const serie = tipoComprobante.serie



        const venta = new Ventas()


        if (facturar) {
            venta.fecha_facturacion = new Date();
        }

        venta.cliente = cliente
        venta.usuario = usuario
        venta.fecha_venta = new Date()
        venta.tipo_comprobante = tipoComprobante
        venta.subtotal = subtotal
        venta.igv = igv
        venta.total = total
        venta.estado = estado
        venta.observacion = observacion
        venta.serie = serie
        venta.numero = sgtventa


        await queryRunner.manager.save(venta);


        for (const detven of detalleVentas) {


            const prod = productosMap.get(detven.productoid)

            if (!prod) {
                return res.status(400).json({ message: `Producto con ID ${detven.productoid} no encontrado` });
            }


            const sub = detven.precio_unitario * detven.cantidad
            const aplicaIgv = prod.afecta_igv ? sub * 0.18 : 0;

            const tot = sub + aplicaIgv

            const detalleventa = new DetalleVenta()
            detalleventa.producto = prod
            detalleventa.precio_unitario = detven.precio_unitario
            detalleventa.cantidad = detven.cantidad
            detalleventa.subtotal = sub
            detalleventa.afecta_igv = prod.afecta_igv
            detalleventa.venta = venta
            detalleventa.igv = aplicaIgv
            detalleventa.total = tot


            await queryRunner.manager.save(detalleventa);



                prod.cantidad -= detven.cantidad;

                await queryRunner.manager.save(prod)

                const mov = new MovimientoInventario()
                mov.producto = prod
                mov.cantidad = detven.cantidad;
                mov.referencia = `Venta ${venta.serie ?? ""}-${venta.numero ?? ""}`,
                    mov.tipo = TipoMovimiento.SALIDA

                await queryRunner.manager.save(mov);

            



        }




        const pag = new Pago();
        pag.venta = venta;
        pag.fecha = new Date();
        pag.monto = pago.monto;
        pag.vuelto = pago.vuelto;
        pag.metodoPago = metodoPago;
        pag.observacion = pago.observacion ?? "";

         await queryRunner.manager.save(pag);




        let statusmercado = 'ninguno' ;
        if (pago.metodoPagoid == 2 || pago.metodoPagoid == 3) 
            {
        const payment = new Payment(mpClient)

        const body = {
            transaction_amount: dataMercadoPago.transaction_amount,
            token: dataMercadoPago.token,
            description: "Compra en bodega tarjeta",
            installments: 1,
            payment_method_id: dataMercadoPago.payment_method_id,
            issuer_id: dataMercadoPago.issuer_id,
            payer: {
                email: dataMercadoPago.payer.email,
                identification: {
                    type: dataMercadoPago.payer.identification.type,
                    number: dataMercadoPago.payer.identification.number
                }

            },
            external_reference: venta.id.toString()

      
            
        };

        const pagotarjeta = await payment.create({ body })

        statusmercado =  pagotarjeta?.status ?? 'ninguno'
        const idmercado =  pagotarjeta?.id

           if(statusmercado != 'approved')
        {
            await queryRunner.rollbackTransaction();

               return res.status(400).json({
            message: "Pago no aprobado",
            statusPago : statusmercado,
            metodo: metodoPago.nombre
            
        })

        }


        pag.idMercadoPago =  Number(idmercado)
        await queryRunner.manager.save(pag);
        

    

        }
        else if(pago.metodoPagoid == 4)
        {
         const payment = new Payment(mpClient)
            

        var body = {
            token: dataMercadoPago.token,
            transaction_amount: dataMercadoPago.transaction_amount,
            installments: 1,
            description: 'Compra en bodega yape',
            payment_method_id: 'yape',
            payer: {
                email:  dataMercadoPago.payer.email,
            },
            external_reference: venta.id.toString()
           
         
            };

        console.log('body',body)


        const pagotarjeta = await payment.create({ body })

        statusmercado =  pagotarjeta?.status ?? 'ninguno'
        const idmercado =  pagotarjeta?.id

        pag.idMercadoPago =  Number(idmercado)
        await queryRunner.manager.save(pag);

        if(statusmercado != 'approved')
        {
            await queryRunner.rollbackTransaction();

               return res.status(400).json({
            message: "Pago no aprobado",
            statusPago : statusmercado,
            metodo: metodoPago.nombre
            
        })

        }
    
       
        }


        await queryRunner.commitTransaction();
        return res.status(201).json({
            message: "Venta registrada correctamente",
            statusPago : statusmercado,
            metodo: metodoPago.nombre,
            ventaId : venta.id
        })



    }
    catch (error: any) {
        await queryRunner.rollbackTransaction();

        console.error(error.message);

        return res.status(500).json({
            message: error.message ?? "Error al registrar la venta",
        });
    } finally {
        await queryRunner.release();
    }



}



export const cambiarEstadoVenta = async (req: Request, res: Response): Promise<Response> => {


    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {
        const { id, estado } = req.body;


        if (!estado) {
            return res.status(400).json({ message: "Debe enviar el estado de la venta" });
        }

        if (estado === 'FACTURADO') {
            let ventaActual = await queryRunner.manager.findOne(Ventas, { where: { id: Number(id) } })

            if (!ventaActual) {
                return res.status(400).json({ message: `venta no encontrada` });

            }



            if (ventaActual.estado === "ANULADO") {
                return res.status(400).json({ message: "No se puede facturar una venta anulada" });
            }



            ventaActual.estado = 'FACTURADO'
            ventaActual.fecha_facturacion = new Date();




            await queryRunner.manager.save(ventaActual);


            await queryRunner.commitTransaction();
            return res.status(201).json({
                message: "Venta Facturada correctamente"

            });


        }
        else if (estado === 'ANULADO') {


            if (!id) {
                return res.status(400).json({ message: "Debe enviar el ID de la venta" });
            }

            // Buscar venta con detalle y productos
            const venta = await queryRunner.manager.findOne(Ventas, {
                where: { id: Number(id) },
                relations: ["detalleVentas", "detalleVentas.producto"],
            });

            if (!venta) {
                return res.status(404).json({ message: "Venta no encontrada" });
            }

            // YA ANULADA
            if (venta.estado === "ANULADO") {
                return res.status(400).json({ message: "La venta ya fue anulada anteriormente" });
            }

            // OPCIONAL → si no deseas permitir anular facturadas
            // if (venta.estado === "FACTURADO") {
            //     return res.status(400).json({ message: "No se puede anular una venta facturada" });
            // }

            // DEVOLVER STOCK POR CADA DETALLE
            for (const det of venta.detalleVentas) {

                const prod = det.producto;

                prod.cantidad += det.cantidad; // devolver stock

                await queryRunner.manager.save(prod);

                // Registrar movimiento de inventario
                const mov = new MovimientoInventario();
                mov.producto = prod;
                mov.tipo = TipoMovimiento.ENTRADA;
                mov.cantidad = det.cantidad;
                mov.referencia = `Anulación venta ${venta.serie ?? ""}-${venta.numero ?? ""}`;

                await queryRunner.manager.save(mov);
            }

            // MARCAR VENTA COMO ANULADA
            venta.estado = "ANULADO";


            await queryRunner.manager.save(venta);

            await queryRunner.commitTransaction();

            return res.status(200).json({
                message: "Venta anulada correctamente",
            });





        }
        else {
            return res.status(400).json({ message: "Estado no válido" });
        }




    }
    catch (error: any) {
        await queryRunner.rollbackTransaction();
        return res.status(500).json({
            message: error.message ?? "Error al registrar la venta",
        });
    } finally {
        await queryRunner.release();
    }



}






export const listVentas = async (req: Request, res: Response): Promise<Response> => {
    try {

        const ventas = await AppDataSource.getRepository(Ventas).find({
            where: {
                isActive: true,
            },
            select: {
                id: true, fecha_venta: true, fecha_facturacion: true, estado: true, total: true, serie: true,
                numero: true, cliente: { id: true, nombre: true },
                tipo_comprobante: { id: true, nombre: true }

            },
            relations: ["cliente", "tipo_comprobante", "metodoPago"],
            order: {
                fecha_creacion: "DESC"
            }
        });

        return res.json({ result: ventas });

    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
}




export const listcomprobante = async (req: Request, res: Response): Promise<Response> => {
    try {

        const comprobantes = await AppDataSource.getRepository(TipoComprobante).find({
            where: {
                isActive: true,
            },
            select: {
                id: true, nombre: true, codigo_sunat: true, serie: true

            }

        });

        return res.json({ result: comprobantes });

    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
}



export const listmetodopago = async (req: Request, res: Response): Promise<Response> => {
    try {

        const pago = await AppDataSource.getRepository(MetodoPago).find({
            where: {
                isActive: true,
            },
            select: {
                id: true, nombre: true

            }

        });

        return res.json({ result: pago });

    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
}





export const getVentaById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;


        const venta = await AppDataSource.getRepository(Ventas)
            .createQueryBuilder("v")
            .leftJoinAndSelect("v.cliente", "cli")
            .leftJoinAndSelect("v.usuario", "us")
            .leftJoinAndSelect("v.tipo_comprobante", "tc")
            .leftJoinAndSelect("v.detalleVentas", "dv")
            .leftJoinAndSelect("dv.producto", "prod")
            .leftJoinAndSelect("v.pagos", "pag")
            .leftJoinAndSelect("pag.metodoPago", "mp")
            .where("v.id = :id AND v.isActive = true", { id: Number(id) })
            .select([
                // Venta
                "v.id",
                "v.fecha_venta",
                "v.fecha_facturacion",
                "v.fecha_creacion",
                "v.estado",
                "v.total",
                "v.serie",
                "v.numero",
                "v.observacion",

                // Cliente
                "cli.id",
                "cli.nombre",

                // Usuario
                "us.id",
                "us.username",

                // Tipo comprobante
                "tc.id",
                "tc.nombre",
                "tc.codigo_sunat",
                "tc.serie",

                // Detalles
                "dv.id",
                "dv.precio_unitario",
                "dv.cantidad",
                "dv.subtotal",
                "dv.afecta_igv",
                "dv.igv",
                "dv.total",

                // Producto
                "prod.id",
                "prod.nombre",
                "prod.precioVenta",


                // Pagos
                "pag.id",
                "pag.fecha",
                "pag.monto",
                "pag.observacion",
                "pag.vuelto",

                // Método de pago del pago
                "mp.id",
                "mp.nombre",
            ])
            .orderBy("dv.id", "ASC")
            .addOrderBy("pag.id", "ASC")
            .getOne();




        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        return res.json({ result: venta });

    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
};




export const getPagFiltroVentas = async (req: Request, res: Response) => {
    try {
        // Obtener los parámetros de la página y el límite desde la query string
        const page = parseInt(req.query.page as string) || 1;  // Página actual
        const limit = parseInt(req.query.limit as string) || 10;

        const all = req.query.all || "false";

        const offset = (page - 1) * limit;
        const {
            estado,
            tipo_comprobanteid,
            fechaInicio,
            fechaFin,
            search
        } = req.query;


        const ventaRepo = AppDataSource.getRepository(Ventas)

        const qb = ventaRepo
            .createQueryBuilder("v")
            .leftJoin("v.cliente", "cli")
            .leftJoin("v.tipo_comprobante", "tc")
            .where("v.isActive = true");
        if (estado && estado !== 'undefined') qb.andWhere("v.estado = :estado", { estado });
        if (tipo_comprobanteid && tipo_comprobanteid !== 'undefined') qb.andWhere("tc.id = :tipo_comprobanteid", { tipo_comprobanteid });
        if (fechaInicio && fechaInicio !== 'undefined' && fechaFin && fechaFin !== 'undefined') {
            qb.andWhere("v.fecha_venta BETWEEN :inicio AND :fin", { inicio: fechaInicio, fin: fechaFin });
        }

        if (search && search !== 'undefined') {
            qb.andWhere("(cli.nombre LIKE :search OR cli.numero_documento LIKE :search OR CONCAT(v.serie, '-', v.numero) LIKE :search)", {
                search: `%${search}%`
            });
        }

        qb.select([
            "v.id",
            "v.fecha_venta",
            "v.fecha_facturacion",
            "v.fecha_creacion",
            "v.estado",
            "v.total",
            "v.serie",
            "v.numero",
            "cli.id",
            "cli.nombre",
            "cli.numero_documento",
            "tc.id",
            "tc.nombre"

        ]);


        if (all === "true") {
            qb.orderBy("v.fecha_creacion", "DESC")
        }

        else {
            qb.orderBy("v.fecha_creacion", "DESC")
                .skip(offset)
                .take(limit);
        }






        const [ventas, totalItems] = await qb.getManyAndCount();



        return res.json({
            ventas,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        });



    } catch (error) {
        console.error('Error al obtener los ventas paginados:', error);
        return res.status(500).json({ message: 'Error al obtener ventas' });
    }
};


export const getProximoNumero = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;


        const tipoComprobante = await AppDataSource.getRepository(TipoComprobante)
            .findOne({ where: { id: Number(id), isActive: true } });



        if (!tipoComprobante) {
            return res.status(404).json({ message: "Tipo de comprobante no encontrado" });
        }





        const venta = await AppDataSource.getRepository(Ventas)
            .createQueryBuilder("v")
            .where("v.tipoComprobanteid = :id", { id: Number(id) })
            .orderBy("v.numero", "DESC")
            .getOne();

        const siguiente = venta ? venta.numero + 1 : 1;

        return res.json({
            serie: tipoComprobante.serie,
            siguiente_numero: siguiente
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message ?? error });
    }
};

