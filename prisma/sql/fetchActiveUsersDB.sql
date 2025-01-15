SELECT * FROM usuario AS U, posee AS P, cliente AS C WHERE U.Status = 1  
AND P.IDUsuario = U.IDUsuario AND U.IDUsuario = C.IDCliente AND P.IDRol = 'ROL02'