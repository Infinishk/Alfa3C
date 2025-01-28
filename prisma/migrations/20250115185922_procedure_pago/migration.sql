CREATE PROCEDURE `savePago` (IN `pIDRenta` VARCHAR(50), IN `pMotivo` VARCHAR(300), IN `pMontoPagado` DECIMAL(14,2),
IN `pNota` VARCHAR(500), IN `pMetodoPago` VARCHAR(100), IN `pFechaPago` DATETIME)
BEGIN
	INSERT INTO Pago (IDRenta, Motivo, montoPagado, Nota, metodoPago, fechaPago) 
    VALUES(pIDRenta, pMotivo, pMontoPagado, pNota, pMetodoPago, pFechaPago);
END;
