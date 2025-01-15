SELECT * FROM cliente AS C, usuario AS U 
WHERE C.IDCliente = U.IDUsuario AND RFC = ?