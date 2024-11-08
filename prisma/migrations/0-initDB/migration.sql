-- CreateTable
CREATE TABLE `asignacionContrato` (
    `IDDetalleContrato` VARCHAR(50) NOT NULL,
    `IDContrato` VARCHAR(50) NOT NULL,
    `IDCliente` VARCHAR(50) NOT NULL,
    `Nombre` VARCHAR(150) NOT NULL,
    `FechaInflacion` DATETIME(0) NOT NULL,
    `PorcentajeInflacion` DECIMAL(14, 2) NOT NULL,

    INDEX `IDCliente`(`IDCliente`),
    INDEX `IDContrato`(`IDContrato`),
    PRIMARY KEY (`IDDetalleContrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `casoUso` (
    `IDCasoUso` VARCHAR(50) NOT NULL,
    `NombreCaso` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`IDCasoUso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `IDCliente` VARCHAR(100) NOT NULL,
    `Direccion` VARCHAR(200) NOT NULL,
    `Teléfono` VARCHAR(40) NOT NULL,
    `RFC` VARCHAR(100) NOT NULL,
    `ReferenciaBancaria` VARCHAR(100) NOT NULL,
    `PorcentajeInteres` DECIMAL(5, 2) NOT NULL,
    `TipoCliente` VARCHAR(100) NOT NULL,
    `MontoRetencion` DECIMAL(14, 2) NOT NULL,

    PRIMARY KEY (`IDCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contiene` (
    `IDCasoUso` VARCHAR(50) NOT NULL,
    `IDRol` VARCHAR(50) NOT NULL,

    INDEX `IDCasoUso`(`IDCasoUso`),
    INDEX `IDRol`(`IDRol`),
    PRIMARY KEY (`IDCasoUso`, `IDRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contrato` (
    `IDContrato` VARCHAR(50) NOT NULL,
    `IDRazonSocial` VARCHAR(50) NOT NULL,
    `Titulo` VARCHAR(50) NOT NULL,
    `DuracionMeses` INTEGER NOT NULL,
    `Estatus` TINYINT NOT NULL,

    INDEX `IDRazonSocial`(`IDRazonSocial`),
    PRIMARY KEY (`IDContrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago` (
    `IDPago` VARCHAR(50) NOT NULL,
    `IDRenta` VARCHAR(50) NOT NULL,
    `Motivo` VARCHAR(300) NOT NULL,
    `MontoPagado` DECIMAL(14, 2) NOT NULL,
    `Nota` VARCHAR(500) NOT NULL,
    `MetodoPago` VARCHAR(100) NOT NULL,
    `FechaPago` DATETIME(0) NOT NULL,

    INDEX `IDRenta`(`IDRenta`),
    PRIMARY KEY (`IDPago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posee` (
    `IDUsuario` VARCHAR(50) NOT NULL,
    `IDRol` VARCHAR(50) NOT NULL,

    INDEX `IDRol`(`IDRol`),
    INDEX `IDUsuario`(`IDUsuario`),
    PRIMARY KEY (`IDRol`, `IDUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `razonSocial` (
    `IDRazonSocial` VARCHAR(50) NOT NULL,
    `NombreEmpresa` VARCHAR(100) NOT NULL,
    `ReferenciaBancaria` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`IDRazonSocial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `renta` (
    `IDRenta` VARCHAR(50) NOT NULL,
    `IDDetalleContrato` VARCHAR(50) NOT NULL,
    `IDCliente` VARCHAR(50) NOT NULL,
    `MontoPagado` DECIMAL(14, 2) NOT NULL,
    `MontoAPagar` DECIMAL(14, 2) NOT NULL,
    `MontoInflacion` DECIMAL(14, 2) NOT NULL,
    `Recargos` DECIMAL(14, 2) NOT NULL,
    `FechaLimite` DATETIME(0) NOT NULL,
    `Pagado` TINYINT NOT NULL,
    `Ajuste` DECIMAL(14, 2) NOT NULL,
    `TieneRecargos` TINYINT NOT NULL,
    `Modificador` VARCHAR(50) NULL,
    `NotaModificacion` VARCHAR(300) NULL,
    `FechaModificacion` DATETIME(0) NULL,

    INDEX `IDCliente`(`IDCliente`),
    INDEX `IDDetalleContrato`(`IDDetalleContrato`),
    PRIMARY KEY (`IDRenta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol` (
    `IDRol` VARCHAR(50) NOT NULL,
    `Nombre` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`IDRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `IDUsuario` VARCHAR(50) NOT NULL,
    `Nombre` VARCHAR(200) NOT NULL,
    `Apellidos` VARCHAR(200) NOT NULL,
    `Contraseña` VARCHAR(100) NOT NULL,
    `Status` TINYINT NOT NULL,
    `CorreoElectronico` VARCHAR(100) NOT NULL,
    `FechaRegistro` DATETIME(0) NOT NULL,

    PRIMARY KEY (`IDUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asignacionContrato` ADD CONSTRAINT `asignacionContrato_ibfk_1` FOREIGN KEY (`IDContrato`) REFERENCES `contrato`(`IDContrato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `asignacionContrato` ADD CONSTRAINT `asignacionContrato_ibfk_2` FOREIGN KEY (`IDCliente`) REFERENCES `cliente`(`IDCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `contiene` ADD CONSTRAINT `contiene_ibfk_1` FOREIGN KEY (`IDCasoUso`) REFERENCES `casoUso`(`IDCasoUso`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `contiene` ADD CONSTRAINT `contiene_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol`(`IDRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `contrato` ADD CONSTRAINT `contrato_ibfk_1` FOREIGN KEY (`IDRazonSocial`) REFERENCES `razonSocial`(`IDRazonSocial`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`IDRenta`) REFERENCES `renta`(`IDRenta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `posee` ADD CONSTRAINT `posee_ibfk_1` FOREIGN KEY (`IDRol`) REFERENCES `rol`(`IDRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `posee` ADD CONSTRAINT `posee_ibfk_2` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario`(`IDUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `renta` ADD CONSTRAINT `renta_ibfk_1` FOREIGN KEY (`IDDetalleContrato`) REFERENCES `asignacionContrato`(`IDDetalleContrato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `renta` ADD CONSTRAINT `renta_ibfk_2` FOREIGN KEY (`IDCliente`) REFERENCES `cliente`(`IDCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

DELIMITER $$
CREATE TRIGGER `idRenta` BEFORE INSERT ON `renta` FOR EACH ROW BEGIN
    DECLARE last_id VARCHAR(50);
    DECLARE numeric_part INT;

    -- Obtén el último ID de la tabla
    SELECT IDRenta INTO last_id FROM renta ORDER BY IDRenta DESC LIMIT 1;

     -- Si no existe ningún ID previo, se inicializa en 1
    IF last_id IS NULL THEN
        SET numeric_part = 1;
    ELSE
		-- Extrae la parte numérica y la incrementa
		SET numeric_part = CAST(SUBSTRING(last_id, 5) AS UNSIGNED) + 1;
    END IF;

    -- Genera el nuevo ID y lo asigna al nuevo registro
    SET NEW.IDRenta = CONCAT('RENT', LPAD(numeric_part, 10, '0'));
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `idPago` BEFORE INSERT ON `pago` FOR EACH ROW BEGIN
    DECLARE last_id VARCHAR(50);
    DECLARE numeric_part INT;

    -- Obtén el último ID de la tabla
    SELECT IDPago INTO last_id FROM pago ORDER BY IDPago DESC LIMIT 1;

     -- Si no existe ningún ID previo, se inicializa en 1
    IF last_id IS NULL THEN
        SET numeric_part = 1;
    ELSE
		-- Extrae la parte numérica y la incrementa
		SET numeric_part = CAST(SUBSTRING(last_id, 5) AS UNSIGNED) + 1;
    END IF;

    -- Genera el nuevo ID y lo asigna al nuevo registro
    SET NEW.IDPago = CONCAT('PAGO', LPAD(numeric_part, 10, '0'));
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `idContrato` BEFORE INSERT ON `contrato` FOR EACH ROW BEGIN
    DECLARE last_id VARCHAR(50);
    DECLARE numeric_part INT;

    -- Obtén el último ID de la tabla
    SELECT IDContrato INTO last_id FROM contrato ORDER BY IDContrato DESC LIMIT 1;
    
    -- Si no existe ningún ID previo, se inicializa en 1
    IF last_id IS NULL THEN
        SET numeric_part = 1;
    ELSE
		-- Extrae la parte numérica y la incrementa
		SET numeric_part = CAST(SUBSTRING(last_id, 5) AS UNSIGNED) + 1;
    END IF;

    -- Genera el nuevo ID y lo asigna al nuevo registro
    SET NEW.IDContrato = CONCAT('CONT', LPAD(numeric_part, 4, '0'));
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `idDetalleContrato` BEFORE INSERT ON `asignacionContrato` FOR EACH ROW BEGIN
    DECLARE last_id VARCHAR(50);
    DECLARE numeric_part INT;

    -- Obtén el último ID de la tabla
    SELECT IDDetalleContrato INTO last_id FROM asignacionContrato ORDER BY IDDetalleContrato DESC LIMIT 1;
    
    -- Si no existe ningún ID previo, se inicializa en 1
    IF last_id IS NULL THEN
        SET numeric_part = 1;
    ELSE
		-- Extrae la parte numérica y la incrementa
		SET numeric_part = CAST(SUBSTRING(last_id, 8) AS UNSIGNED) + 1;
    END IF;

    -- Genera el nuevo ID y lo asigna al nuevo registro
    SET NEW.IDDetalleContrato = CONCAT('DETCONT', LPAD(numeric_part, 10, '0'));
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `idRol` BEFORE INSERT ON `rol` FOR EACH ROW BEGIN
    DECLARE last_id VARCHAR(50);
    DECLARE numeric_part INT;

    -- Obtén el último ID de la tabla
    SELECT IDRol INTO last_id FROM rol ORDER BY IDRol DESC LIMIT 1;
    
    -- Si no existe ningún ID previo, se inicializa en 1
    IF last_id IS NULL THEN
        SET numeric_part = 1;
    ELSE
        -- Extrae la parte numérica y la incrementa
        SET numeric_part = CAST(SUBSTRING(last_id, 4) AS UNSIGNED) + 1;
    END IF;

    -- Genera el nuevo ID y lo asigna al nuevo registro
    SET NEW.IDRol = CONCAT('ROL', LPAD(numeric_part, 2, '0'));
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `idCasoUso` BEFORE INSERT ON `casouso` FOR EACH ROW BEGIN
    DECLARE last_id VARCHAR(50);
    DECLARE numeric_part INT;

    -- Obtén el último ID de la tabla
    SELECT IDCasoUso INTO last_id FROM casouso ORDER BY IDCasoUso DESC LIMIT 1;
    
    -- Si no existe ningún ID previo, se inicializa en 1
    IF last_id IS NULL THEN
        SET numeric_part = 1;
    ELSE
        -- Extrae la parte numérica y la incrementa
		SET numeric_part = CAST(SUBSTRING(last_id, 3) AS UNSIGNED) + 1;
    END IF;
    
    -- Genera el nuevo ID y lo asigna al nuevo registro
    SET NEW.IDCasoUso = CONCAT('CU', LPAD(numeric_part, 3, '0'));
END $$
DELIMITER ;

DELIMITER $$

CREATE TRIGGER idUsuario
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    DECLARE nombre_iniciales VARCHAR(3);
    DECLARE apellido_iniciales VARCHAR(3);
    DECLARE secuencia VARCHAR(4); 
    DECLARE id_unico VARCHAR(50);

    -- Obtener las primeras 3 letras del nombre y 3 del apellido
    SET nombre_iniciales = LEFT(NEW.Nombre, 3);
    SET apellido_iniciales = LEFT(NEW.Apellidos, 3);

    -- Contar cuántos clientes ya existen con las mismas iniciales para generar el siguiente número secuencial
    SET secuencia = LPAD((SELECT COUNT(*) + 1 FROM usuario 
                          WHERE LEFT(Nombre, 3) = nombre_iniciales
                          AND LEFT(Apellidos, 3) = apellido_iniciales), 4, '0');

    -- Generar el IDCliente combinando las iniciales y la secuencia de 4 dígitos
    SET id_unico = CONCAT(UPPER(nombre_iniciales), UPPER(apellido_iniciales), secuencia);

    -- Asignar el nuevo IDCliente al campo de la fila que está siendo insertada
    SET NEW.IDUsuario = id_unico;
END $$

DELIMITER ;

DELIMITER $$
CREATE TRIGGER `idRazonSocial` BEFORE INSERT ON `razonSocial` FOR EACH ROW BEGIN
    DECLARE last_id VARCHAR(50);
    DECLARE numeric_part INT;

    -- Obtén el último ID de la tabla
    SELECT IDRazonSocial INTO last_id FROM razonSocial ORDER BY IDRazonSocial DESC LIMIT 1;
    
    -- Si no existe ningún ID previo, se inicializa en 1
    IF last_id IS NULL THEN
        SET numeric_part = 1;
    ELSE
        -- Extrae la parte numérica y la incrementa
		SET numeric_part = CAST(SUBSTRING(last_id, 7) AS UNSIGNED) + 1;
    END IF;
    
    -- Genera el nuevo ID y lo asigna al nuevo registro
    SET NEW.IDRazonSocial = CONCAT('RZNSOC', LPAD(numeric_part, 2, '0'));
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `actualizarEstadoPago` BEFORE UPDATE ON `renta` FOR EACH ROW 
BEGIN
   IF (NEW.MontoAPagar + NEW.Recargos + NEW.MontoInflacion) <= NEW.MontoPagado THEN
      SET NEW.Pagado = 1;
   ELSE
      SET NEW.Pagado = 0;
   END IF;
END $$
DELIMITER ;