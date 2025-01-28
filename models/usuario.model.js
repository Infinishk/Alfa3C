const bcrypt = require('bcryptjs');
const prisma = require('../util/database'); 
const { fetchActiveUsersDB, fetchInactiveUsersDB, saveUsuario } = require('@prisma/client/sql');

module.exports = class Usuario {
    constructor(miNombre, miApellidos, miCorreoElectronico) {
        this.Nombre = miNombre;
        this.Apellidos = miApellidos;
        this.correoElectronico = miCorreoElectronico;
    }

    saveUsuarioPrisma() {
        return prisma.$queryRawTyped(saveUsuario(this.Nombre, this.Apellidos, this.CorreoElectronico));
    }

    async updateContra() {
        const passwordCifrado = await bcrypt.hash(this.password, 12);
        
        return prisma.usuario.update({
            where: {
                IDUsuario: this.IDUsuario
            },
            data: {
                Contraseña: passwordCifrado,
                Status: 1
            }
        });
    }
    
    static async fetchOne(CorreoElectronico) {
        return prisma.usuario.findFirst({
            where: {
                CorreoElectronico: CorreoElectronico
            }
        });
    }

    static async fetchOneID(IDUsuario) {
        return prisma.usuario.findUnique({
            where: {
                IDUsuario: IDUsuario
            }
        });
    }

    static async fetchCorreo(IDUsuario) {
        const usuario = await prisma.usuario.findUnique({
            where: {
                IDUsuario: IDUsuario
            },
            select: {
                correoElectronico: true
            }
        });
        return usuario ? usuario.correoElectronico : null;
    }

    static async getPermisos(IDUsuario) {
        return prisma.usuario.findUnique({
            where: {
                IDUsuario: IDUsuario
            },
            select: {
                posee: {
                    select: {
                        rol: {
                            select: {
                                contiene: {
                                    select: {
                                        IDCasoUso: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        .then(usuario => {
            if (usuario) {
                return usuario.posee.flatMap(posee =>
                    posee.rol.contiene.map(contiene => contiene.IDCasoUso)
                );
            } else {
                return []; 
            }
        });
    }

    static async getRol(IDUsuario) {
        return prisma.usuario.findUnique({
            where: {
                IDUsuario: IDUsuario
            },
            select: {
                posee: {
                    select: {
                        IDRol: true
                    }
                }
            }
        })
        .then(usuario => {
            return usuario ? usuario.posee.map(posee => posee.IDRol) : [];
        });
    }

    static async saveRol(IDUsuario, IDRol) {
        return prisma.posee.create({
            data: {
                usuario: {
                    connect: {
                        IDUsuario: IDUsuario
                    }
                },
                rol: {
                    connect: {
                        IDRol: IDRol
                    }
                }
            }
        });
    }

    static async saveCliente(IDCliente, Direccion, Telefono, RFC, ReferenciaBancaria, 
        PorcentajeInteres, MontoRetencion, TipoCliente) {
        return prisma.cliente.create({
            data: {
                IDCliente: IDCliente,
                Direccion: Direccion,
                Teléfono: Telefono,
                RFC: RFC,
                ReferenciaBancaria: ReferenciaBancaria,
                PorcentajeInteres: PorcentajeInteres,
                MontoRetencion: MontoRetencion,
                TipoCliente: TipoCliente
            }
        });
    }

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