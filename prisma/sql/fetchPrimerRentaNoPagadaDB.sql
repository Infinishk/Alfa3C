SELECT * FROM 

(SELECT R.IDRenta, R.MontoPagado, R.MontoAPagar, R.FechaLimite, R.Recargos, R.MontoInflacion,
C.ReferenciaBancaria, C.IDCliente, C.TipoCliente, R.IDDetalleContrato, AC.Nombre,
ROW_NUMBER() OVER (PARTITION BY R.IDDetalleContrato ORDER BY R.FechaLimite ASC) AS RentaContratos
FROM renta AS R, cliente AS C, usuario AS U, asignacionContrato AS AC
WHERE C.IDCliente = R.IDCliente AND C.IDCliente = U.IDUsuario AND R.IDDetalleContrato = AC.IDDetalleContrato
AND R.Pagado = 0 AND R.IDCliente = ?) AS RentasSinPagar
            
WHERE RentaContratos = 1;