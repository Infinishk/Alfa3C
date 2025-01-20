
const prisma = require('../util/database'); 

const { fetchActiveContratsDB, fetchInactiveContratsDB } = require('@prisma/client/sql');

module.exports = class Contrato{

    static async fetchActivos() {
        return await prisma.$queryRawTyped(fetchActiveContratsDB());
    }

    static async fetchInactivos() {
        return await prisma.$queryRawTyped(fetchInactiveContratsDB());
    }

    static async fetchOne(id) {
        return await prisma.$queryRaw`
            SELECT 
                Contrato.IDContrato, 
                RazonSocial.NombreEmpresa, 
                Contrato.DuracionMeses, 
                Contrato.Titulo, 
                Contrato.Estatus 
            FROM 
                Contrato 
            JOIN 
                RazonSocial ON Contrato.IDRazonSocial = RazonSocial.IDRazonSocial 
            WHERE 
                Contrato.IDContrato = ${id}`;
    }
    
    static async fetchName(nombre) {
        return await prisma.$queryRaw`
            SELECT 
                Contrato.IDContrato 
            FROM 
                Contrato 
            WHERE 
                Contrato.Titulo = ${nombre}`;
    }

    static async fetchClientes(id) {
        return await prisma.$queryRaw`
            SELECT 
                AsignacionContrato.Nombre AS ContratoNombre, 
                Usuario.Nombre AS UsuarioNombre, 
                Usuario.Apellidos, 
                Cliente.RFC, 
                Cliente.TipoCliente, 
                Cliente.MontoRetencion, 
                Cliente.PorcentajeInteres 
            FROM 
                AsignacionContrato 
            JOIN 
                Contrato ON AsignacionContrato.IDContrato = Contrato.IDContrato 
            JOIN 
                Cliente ON AsignacionContrato.IDCliente = Cliente.IDCliente 
            JOIN 
                Usuario ON Cliente.IDCliente = Usuario.IDUsuario 
            WHERE 
                Contrato.IDContrato = ${id}`;
    }

    static async fetchNumClientes(id) {
        return await prisma.$queryRaw`
            SELECT COUNT(*) AS asignaciones 
            FROM AsignacionContrato 
            WHERE IDContrato = ${id}`;
    }

    static async updateEstatus(estatus, id) {
        return await prisma.$executeRaw`
            UPDATE Contrato 
            SET Estatus = ${estatus} 
            WHERE IDContrato = ${id}`;
    }

    static async save(idRazonSocial, titulo, numMeses) {
        return await prisma.$executeRaw`
            INSERT INTO Contrato (IDRazonSocial, Titulo, DuracionMeses, Estatus) 
            VALUES (${idRazonSocial}, ${titulo}, ${numMeses}, 1)`;
    }

    static async update(idRazonSocial, titulo, numMeses, idContrato) {
        return await prisma.$executeRaw`
            UPDATE Contrato 
            SET IDRazonSocial = ${idRazonSocial}, Titulo = ${titulo}, DuracionMeses = ${numMeses} 
            WHERE IDContrato = ${idContrato}`;
    }
}
