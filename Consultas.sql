use storage_sync_vault;

select * from storage_sync_vault.Planes;
select * from storage_sync_vault.Usuarios;
select * from storage_sync_vault.CajaFuertes;
select * from storage_sync_vault.Objetos;
select * from storage_sync_vault.ObjetosEliminados;
select * from storage_sync_vault.objetoscompartidos;
select * from storage_sync_vault.Objetos;

INSERT INTO `storage_sync_vault`.`Planes` (`IdPlanes`, `Nombre`, `Precio`, `Descripcion`, `GbDisponibles`, `GbCajaFuerte`, `GbCompartidos`, `DiasRecuperacion`) VALUES ('3e366d3d-54ea-11ee-a058-0250b7d1102c', 'Plan 1', '100', 'Plan para usuarios finales', '100', '10', '5', '30');


select uuid();

select * from storage_sync_vault.Objetos where UbicacionLogica like '%3cddd1ea-598e-4b6b-a6f3-6db3e821472a%' and UbicacionLogica like '%8e4b149b-5fe1-4796-a77e-62ce1a00c539%';

select * from storage_sync_vault.Objetos where UbicacionLogica like '%3cddd1ea-598e-4b6b-a6f3-6db3e821472a*8e4b149b-5fe1-4796-a77e-62ce1a00c539%' ;

SELECT * FROM `Objetos` AS `Objetos` WHERE (`Objetos`.`IdObjetos` = 'd72a2770-2fd2-4453-9c01-a8f75f1bc86a' AND `Objetos`.`EsDirectorio` = true AND `Objetos`.`EstaEliminado` = false) LIMIT 1;

/a28cfe9e-c855-4efa-bcbf-d5c3fa91415d
/ee089e17-c9fb-422d-a7aa-0a6779ae2a1f
/6b3eb300-e907-4711-a4a6-76bd0599c484
/b1e833b6-77d7-4ef6-a759-eecaa336298b
/c2df3a4a-9c15-482e-b9c8-06da7a38ea65
/c3406c39-eb0c-416b-8047-0026695a4ec3