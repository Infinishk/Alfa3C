CREATE PROCEDURE saveUsuario(
    IN p_Nombre VARCHAR(200),
    IN p_Apellidos VARCHAR(200),
    IN p_CorreoElectronico VARCHAR(100)
)
BEGIN
    INSERT INTO Usuario (Nombre, Apellidos, Contraseña, CorreoElectronico, Status, FechaRegistro) 
    VALUES (p_Nombre, p_Apellidos, "", p_CorreoElectronico, 0, NOW());
END;