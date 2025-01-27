const bcrypt = require('bcryptjs');
const prisma = require('../util/database'); 
const { fetchActiveUsersDB, fetchInactiveUsersDB } = require('@prisma/client/sql');
const { saveUsuario } = require('../util/database');

module.exports = class Usuario {
    constructor(miIDUsuario, miPassword) {
        this.IDUsuario = miIDUsuario;
        this.password = miPassword;
    }

    saveUsuarioManual() {
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

    static async fetchActivos() {
        return prisma.usuario.findMany({
            where: {
                UsuarioActivo: 1 
            }
        });
    }

    static async fetchNoActivos() {
        return prisma.usuario.findMany({
            where: {
                UsuarioActivo: 0 
            }
        });
    }

    static async update(IDUsuario, estado) {
        return prisma.usuario.update({
            where: {
                IDUsuario: IDUsuario
            },
            data: {
                UsuarioActivo: estado 
            }
        });
    }

    static async buscarActivos(consulta) {
        return prisma.usuario.findMany({
            where: {
                IDUsuario: {
                    contains: consulta 
                },
                UsuarioActivo: 1
            }
        });
    }

    static async buscarNoActivos(consulta) {
        return prisma.usuario.findMany({
            where: {
                IDUsuario: {
                    contains: consulta 
                },
                UsuarioActivo: 0
            }
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

    static async saveCliente(
        IDCliente, Direccion, Telefono, RFC, ReferenciaBancaria, 
        PorcentajeInteres, MontoRetencion, TipoCliente
    ) {
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
        return prisma.$queryRaw`SELECT * FROM usuario AS U, posee AS P, cliente AS C WHERE U.Status = 1  
        AND P.IDUsuario = U.IDUsuario AND U.IDUsuario = C.IDCliente AND P.IDRol = 'ROL02'`;
    }

    static async fetchInactiveUsers() {
        return prisma.$queryRaw`SELECT * FROM usuario AS U, posee AS P, cliente AS C WHERE U.Status = 0
        AND P.IDUsuario = U.IDUsuario AND U.IDUsuario = C.IDCliente AND P.IDRol = 'ROL02'`;
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