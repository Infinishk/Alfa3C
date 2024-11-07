const prisma = require('../util/database'); 

module.exports = class Usuario {

    static async modifyUserStatus(status, userID) {
        return prisma.usuario.update({
            where: {
                IDUsuario: userID 
            },
            data: { 
                Status: status 
            }
        });
    }

    static async fetchActiveUsers() {
        return prisma.$queryRaw`
        SELECT * FROM usuario AS U, posee AS P, cliente AS C WHERE U.Status = 1 
        AND P.IDUsuario = U.IDUsuario AND U.IDUsuario = C.IDCliente AND P.IDRol = 'ROL02'
        `;
    }

    static async fetchInactiveUsers() {
        return prisma.$queryRaw`
        SELECT * FROM usuario AS U, posee AS P, cliente AS C WHERE U.Status = 0
        AND P.IDUsuario = U.IDUsuario AND U.IDUsuario = C.IDCliente AND P.IDRol = 'ROL02'
        `;
    }

    static async fetchAdmins() {
        return prisma.usuario.findMany({
            where: {
                posee: {
                    some: {
                        IDRol: 'ROL01'
                    }
                }
            }, 
            include: {
                posee: true
            }
        });
    }

};