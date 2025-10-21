
import { Response, Request } from 'express'

import { AppDataSource } from '../index'

import {Cliente} from "../core/entities/clientes"
import { createClienteInteractor, deleteClienteInteractor, updateClienteInteractor, } from '../core/interactor/cliente';
import { TipoDocumento } from '../core/entities/tipo_documento';


export const createCliente = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { nombre, tipo_documento,numero_documento,direccion ,correo,telefono, es_empresa } = req.body


        const tipodoc = await AppDataSource.getRepository(TipoDocumento).findOne({where:{id :tipo_documento}})


        

            




    
        
        const clie = new Cliente();
        clie.nombre = nombre;
        clie.tipo_documento=tipodoc ?? null;
        clie.numero_documento = numero_documento ?? null;
        clie.direccion =direccion ?? null;
        clie.correo =correo ?? null;
        clie.telefono= telefono ?? null;;
        clie.es_empresa = es_empresa ?? false;


        const clicorr = await AppDataSource.getRepository(Cliente).findOne({
                where: { correo : correo, isActive: true }
      
            });

        if (clicorr) {
            return res.status(400).json({ message: "correo ya registrado" })

        }


        if (tipo_documento && numero_documento)
                {
                   const clidoc = await AppDataSource.getRepository(Cliente).findOne({
                        where:{numero_documento,tipo_documento:{id: tipo_documento} },
                        relations:['tipo_documento']


                    })




                    if (clidoc)
                    {
                        return res.status(400).json({message:"Número de documento ya registrado"});

                    }
                }

               
   
       

        const result = await createClienteInteractor(clie);
     

        return res.json({ result: result });
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }



}

export const listTipoDoc = async (req:Request,res:Response) :Promise<Response>=>{

    try{

         const prop = await AppDataSource.getRepository(TipoDocumento).find({
            where: {
                isActive: true
            }

        })



        return res.json({ result: prop });



    }

    catch (error: any){

        return res.status(500).json({ message: error.message ?? error })

    }


}






export const listCliente = async (req: Request, res: Response): Promise<Response> => {


    try {

        const prop = await AppDataSource.getRepository(Cliente).find({
            where: {
                isActive: true,
            }

        })



        return res.json({ result: prop });

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }


}



export const updateCliente = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id,nombre, tipo_documento,numero_documento,direccion ,correo,telefono, es_empresa } = req.body
        
        const tipodoc = await AppDataSource.getRepository(TipoDocumento).findOne({where:{id :tipo_documento}})

        const clieact = await AppDataSource.getRepository(Cliente).findOne({where:{id:id}})

        if  (!clieact)
        {
            return res.status(400).json({message:"cliente no existe"})
        }


        if ( correo && clieact?.correo !== correo)
        {

            
        const clicorr = await AppDataSource.getRepository(Cliente).findOne({
                where: { correo : correo, isActive: true }
      
            });

        if (clicorr && clicorr.id !== clieact.id ) {
            return res.status(400).json({ message: "correo ya registrado" })

        }


        }

        if ((clieact.numero_documento != numero_documento)  || (clieact.tipo_documento?.id !== tipo_documento))
            {

                     if (tipo_documento && numero_documento)
                {
                   const clidoc = await AppDataSource.getRepository(Cliente).findOne({
                        where:{numero_documento,tipo_documento:{id: tipo_documento},  isActive: true },
                        relations:['tipo_documento'],



                    })




                    if (clidoc  && clidoc.id !== clieact.id)
                    {
                        return res.status(400).json({message:" Número de documento ya registrado"});

                    }
                }


            }
        

        


        const clie = new Cliente()
        clie.id = id;
        clie.nombre = nombre;
        clie.tipo_documento=tipodoc ?? null;
        clie.numero_documento = numero_documento ?? null;
        clie.direccion =direccion  ?? null;
        clie.correo =correo  ?? null;
        clie.telefono= telefono ?? null;
        clie.es_empresa = es_empresa  ?? false;




        const result = await updateClienteInteractor(clie);


        return res.json({ result: result });



    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }




}


export const searchCliente = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params

        const clie = await AppDataSource.getRepository(Cliente).findOneBy({ id: +id })

        if (!clie) {
            return res.status(500).json({ message: "cliente no encontrado" })
        }

        return res.status(200).json({ result: clie })



    }
    catch (error: any) {
        return res.status(500).json({ message: error.message ?? error })
    }

}
export const deleteCliente = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const clie= await AppDataSource.getRepository(Cliente).findOneBy({ id: +id })

    if (!clie) {
        return res.status(500).json({ message: "cliente no encontrado" })
    }


    const resp = await deleteClienteInteractor(clie)



    return res.json({ message: `Cliente con id ${id} eliminado` });


}


export const getPaginatedCliente = async (req: Request, res: Response) => {
    try {
        // Obtener los parámetros de la página y el límite desde la query string
        const page = parseInt(req.query.page as string) || 1;  // Página actual
        const limit = parseInt(req.query.limit as string) || 10;  // Elementos por página

        // Calcular cuántos elementos saltar (offset) basado en la página
        const offset = (page - 1) * limit;

        // Repositorio de productos
        const clieRepository = AppDataSource.getRepository(Cliente)

        // Obtener los productos con paginación
        const [clientes, totalItems] = await clieRepository.findAndCount({
            where: { isActive: true },
            relations:['tipo_documento'], 
            skip: offset,
            take: limit,
        });

        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalItems / limit);

        // Respuesta al frontend con los datos paginados
        res.json({
            clientes,
            totalItems,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error al obtener los clientees paginados:', error);
        return res.status(500).json({ message: 'Error al obtener clientees' });
    }
};