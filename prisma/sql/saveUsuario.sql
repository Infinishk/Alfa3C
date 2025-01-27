CREATE PROCEDURE saveUsuario(
    IN p_Nombre VARCHAR(200),
    IN p_Apellidos VARCHAR(200),
    IN p_CorreoElectronico VARCHAR(100)
)
BEGIN
    DECLARE nombre_iniciales VARCHAR(3);
    DECLARE apellido_iniciales VARCHAR(3);
    DECLARE secuencia INT;
    DECLARE id_unico VARCHAR(50);

    -- Obtener las primeras 3 letras del nombre y 3 del apellido
    SET nombre_iniciales = LEFT(p_Nombre, 3);
    SET apellido_iniciales = LEFT(p_Apellidos, 3);

    -- Contar cuántos clientes ya existen con las mismas iniciales para generar el siguiente número secuencial
    SELECT COUNT(*) + 1 INTO secuencia 
    FROM usuario 
    WHERE LEFT(Nombre, 3) = nombre_iniciales
    AND LEFT(Apellidos, 3) = apellido_iniciales;

    -- Generar el IDUsuario combinando las iniciales y la secuencia de 4 dígitos
    SET id_unico = CONCAT(UPPER(nombre_iniciales), UPPER(apellido_iniciales), LPAD(secuencia, 4, '0'));

    -- Guardar el usuario con el IDUsuario generado
    INSERT INTO Usuario (IDUsuario, Nombre, Apellidos, Contraseña, CorreoElectronico, Status, FechaRegistro) 
    VALUES (id_unico, p_Nombre, p_Apellidos, "", p_CorreoElectronico, 0, NOW());
END;