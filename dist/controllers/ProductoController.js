"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarProductoFiltro = exports.getPaginatedProducts = exports.deleteProduct = exports.searchProduct = exports.updateProduct = exports.listProduct = exports.createProduct = void 0;
const index_1 = require("../index");
const producto_1 = require("../core/entities/producto");
const producto_2 = require("../core/interactor/producto");
const categoria_1 = require("../core/entities/categoria");
const unidad_1 = require("../core/entities/unidad");
const proveedor_1 = require("../core/entities/proveedor");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { nombre, precioVenta, precioCompra, cantidad, fechaVencimiento, unidad, categoria, proveedor, afecta_igv, codigoBarras, descripcion } = req.body;
        const existeUnidad = yield index_1.AppDataSource.getRepository(unidad_1.Unidad).findOneBy({ id: unidad });
        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad no encontrada" });
        }
        const existeCategoria = yield index_1.AppDataSource.getRepository(categoria_1.Categoria).findOneBy({ id: categoria });
        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria no encontrada" });
        }
        const existeProveedor = yield index_1.AppDataSource.getRepository(proveedor_1.Proveedor).findOneBy({ id: proveedor });
        const productoRepo = index_1.AppDataSource.getRepository(producto_1.Producto);
        const ultimoProducto = yield productoRepo
            .createQueryBuilder("producto")
            .orderBy("producto.id", "DESC")
            .getOne();
        const siguienteNumero = ((ultimoProducto === null || ultimoProducto === void 0 ? void 0 : ultimoProducto.id) || 0) + 1;
        const sku = `PROD-${String(siguienteNumero).padStart(6, '0')}`;
        const prod = new producto_1.Producto();
        prod.nombre = nombre;
        prod.precioVenta = precioVenta;
        prod.precioCompra = precioCompra;
        prod.afecta_igv = afecta_igv;
        prod.categoria = existeCategoria;
        prod.unidad = existeUnidad;
        prod.cantidad = cantidad;
        prod.codigoBarras = codigoBarras || null;
        prod.descripcion = descripcion;
        prod.fechaVencimiento = fechaVencimiento;
        prod.sku = sku;
        prod.proveedor = existeProveedor !== null && existeProveedor !== void 0 ? existeProveedor : null;
        const result = yield (0, producto_2.createProductInteractor)(prod);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
});
exports.createProduct = createProduct;
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prop = yield index_1.AppDataSource.getRepository(producto_1.Producto).find({
            where: {
                isActive: true,
            },
            relations: ['categoria', 'unidad', 'proveedor']
        });
        return res.json({ result: prop });
    }
    catch (error) {
        return res.status(500).json({ message: (_b = error.message) !== null && _b !== void 0 ? _b : error });
    }
});
exports.listProduct = listProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { id, nombre, precioVenta, precioCompra, cantidad, fechaVencimiento, unidad, categoria, proveedor, afecta_igv, descripcion } = req.body;
        const existeUnidad = yield index_1.AppDataSource.getRepository(unidad_1.Unidad).findOneBy({ id: unidad });
        if (!existeUnidad) {
            return res.status(400).json({ message: "Unidad no encontrada" });
        }
        const existeCategoria = yield index_1.AppDataSource.getRepository(categoria_1.Categoria).findOneBy({ id: categoria });
        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria no encontrada" });
        }
        const existeProveedor = yield index_1.AppDataSource.getRepository(proveedor_1.Proveedor).findOneBy({ id: proveedor });
        const prod = new producto_1.Producto();
        prod.id = id;
        prod.nombre = nombre;
        prod.precioVenta = precioVenta;
        prod.precioCompra = precioCompra;
        prod.categoria = existeCategoria;
        prod.unidad = existeUnidad;
        prod.afecta_igv = afecta_igv;
        prod.cantidad = cantidad;
        prod.fechaVencimiento = fechaVencimiento;
        prod.proveedor = existeProveedor !== null && existeProveedor !== void 0 ? existeProveedor : null;
        prod.descripcion = descripcion;
        const result = yield (0, producto_2.updateProductInteractor)(prod);
        return res.json({ result: result });
    }
    catch (error) {
        return res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : error });
    }
});
exports.updateProduct = updateProduct;
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { id } = req.params;
        const prop = yield index_1.AppDataSource.getRepository(producto_1.Producto).findOneBy({ id: +id });
        if (!prop) {
            return res.status(500).json({ message: "producto no encontrado" });
        }
        return res.status(200).json({ result: prop });
    }
    catch (error) {
        return res.status(500).json({ message: (_d = error.message) !== null && _d !== void 0 ? _d : error });
    }
});
exports.searchProduct = searchProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prop = yield index_1.AppDataSource.getRepository(producto_1.Producto).findOneBy({ id: +id });
    if (!prop) {
        return res.status(500).json({ message: "producto no encontrado" });
    }
    const resp = yield (0, producto_2.deleteProductInteractor)(prop);
    return res.json({ message: `Producto con id ${id} eliminado` });
});
exports.deleteProduct = deleteProduct;
const getPaginatedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = req.query.query;
        const categoria = req.query.categoria;
        const proveedor = req.query.proveedor;
        const fechaVencimiento = req.query.fechaVencimiento;
        const all = req.query.all || "false";
        const ordenStock = req.query.ordenStock;
        const offset = (page - 1) * limit;
        const productRepository = index_1.AppDataSource.getRepository(producto_1.Producto);
        const qb = productRepository.createQueryBuilder("p")
            .where("p.isActive = :isActive", { isActive: true });
        qb.leftJoinAndSelect("p.categoria", "c")
            .leftJoinAndSelect("p.unidad", "u")
            .leftJoinAndSelect("p.proveedor", "prov");
        if (query && query !== "undefined") {
            qb.andWhere("p.nombre LIKE :query OR p.sku LIKE :query", { query: `%${query}%` });
        }
        if (categoria && categoria !== "undefined") {
            qb.andWhere("c.id = :categoria", { categoria });
        }
        if (proveedor && proveedor !== "undefined") {
            qb.andWhere("prov.id = :proveedor", { proveedor });
        }
        qb.select([
            "p.id",
            "p.nombre",
            "p.sku",
            "p.precioVenta",
            "p.precioCompra",
            "p.cantidad",
            "p.descripcion",
            "p.afecta_igv",
            "p.fechaVencimiento",
            "c.id",
            "c.nombre",
            "u.id",
            "u.nombre",
            "prov.id",
            "prov.nombre"
        ]);
        if (fechaVencimiento && fechaVencimiento !== "undefined") {
            qb.andWhere("p.fechaVencimiento >= :fechaVencimiento", { fechaVencimiento });
            qb.orderBy("p.fechaVencimiento", "ASC");
        }
        else {
            qb.orderBy("p.id", "ASC");
        }
        if (ordenStock && ordenStock !== "undefined") {
            if (ordenStock === "ASC") {
                qb.orderBy("p.cantidad", "ASC");
            }
            else if (ordenStock === "DESC") {
                qb.orderBy("p.cantidad", "DESC");
            }
        }
        if (all != "true") {
            qb.skip(offset)
                .take(limit);
        }
        const [productos, totalItems] = yield qb.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);
        res.json({
            productos,
            totalItems,
            totalPages,
            currentPage: page,
        });
    }
    catch (error) {
        console.error('Error al obtener los productos paginados:', error);
        return res.status(500).json({ message: 'Error al obtener productos' });
    }
});
exports.getPaginatedProducts = getPaginatedProducts;
const buscarProductoFiltro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, categoria } = req.query;
        const queryBuilder = index_1.AppDataSource.getRepository(producto_1.Producto)
            .createQueryBuilder("d")
            .where("d.isActive = true");
        if (query) {
            queryBuilder.andWhere("(d.nombre LIKE :q OR d.sku like :q)", { q: `%${query}%` });
        }
        if (categoria && categoria != '') {
            queryBuilder.andWhere("d.categoria = :categoria", { categoria });
        }
        const productos = yield queryBuilder
            .leftJoinAndSelect("d.categoria", "c")
            .leftJoinAndSelect("d.proveedor", "p")
            .select(["d.id", "d.nombre", "d.sku", "d.precioVenta", "d.cantidad", "d.afecta_igv", "d.fechaVencimiento",
            "c.id", "c.nombre", "p.id", "p.nombre"
        ])
            .orderBy("d.id", "ASC")
            .limit(20)
            .getMany();
        return res.json({ result: productos });
    }
    catch (error) {
        console.error('Error al buscar clientes', error);
        return res.status(500).json({ message: 'Error al buscar cliente por filtro' });
    }
});
exports.buscarProductoFiltro = buscarProductoFiltro;
