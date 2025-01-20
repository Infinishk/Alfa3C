const prisma = require('../util/database'); 

const { fetchActiveUsersDB, fetchInactiveUsersDB } = require('@prisma/client/sql');

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
        return prisma.$queryRawTyped(fetchActiveUsersDB());
    }

    static async fetchInactiveUsers() {
        return prisma.$queryRawTyped(fetchInactiveUsersDB());
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