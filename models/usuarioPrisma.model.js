const { prisma } = require('../util/database'); 

module.exports = class UsuarioPrisma {

    static async modifyUserStatus(status, userID) {
        return prisma.usuario.update({
            where: { IDUsuario: userID },
            data: { Status: status }
        });
    }
};
