create database storage_sync_vault;

use storage_sync_vault;


-- -----------------------------------------------------
-- Table `storage_sync_vault`.`Planes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `storage_sync_vault`.`Planes` (
  `IdPlanes` CHAR(36) NOT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Precio` FLOAT NULL,
  `Descripcion` VARCHAR(500) NULL,
  `GbDisponibles` INT NULL,
  `GbCajaFuerte` INT NULL,
  `GbCompartidos` INT NULL,
  `DiasRecuperacion` INT NULL,
  PRIMARY KEY (`IdPlanes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `storage_sync_vault`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `storage_sync_vault`.`Usuarios` (
 `IdUsuarios` CHAR(36) NOT NULL,
  `IdPlanes` CHAR(36) NOT NULL,
  `Correo` VARCHAR(60) NOT NULL,
  `Password` VARCHAR(150) NULL,
  `Nombres` VARCHAR(45) NULL,
  `Apellidos` VARCHAR(45) NULL,
  `TokenAcceso` CHAR(60) NOT NULL,
  `Activo` TINYINT(2) NULL,
  PRIMARY KEY (`IdUsuarios`),
    FOREIGN KEY (`IdPlanes`)
    REFERENCES `storage_sync_vault`.`Planes` (`IdPlanes`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `storage_sync_vault`.`CajaFuertes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `storage_sync_vault`.`CajaFuertes` (
  `IdCajaFuertes` CHAR(36) NOT NULL,
  `IdUsuarios` CHAR(36) NOT NULL,
  `TokenAcceso` CHAR(10) NOT NULL,
  PRIMARY KEY (`IdCajaFuertes`),
    FOREIGN KEY (`IdUsuarios`)
    REFERENCES `storage_sync_vault`.`Usuarios` (`IdUsuarios`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `storage_sync_vault`.`Objetos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `storage_sync_vault`.`Objetos` (
  `IdObjetos` CHAR(36) NOT NULL,
  `IdUsuarios` CHAR(36) NOT NULL,
  `IdCajaFuertes` CHAR(36) NULL,
  `NombreVista` VARCHAR(100) NOT NULL,
  `NombreLogico` VARCHAR(100) NOT NULL,
  `UbicacionVista` TEXT NOT NULL,
  `UbicacionLogica` TEXT NOT NULL,
  `Padre` CHAR(36) NOT NULL,
  `EsDirectorio` TINYINT(2) NOT NULL,
  `Mime` VARCHAR(45) NOT NULL,
  `PesoMB` FLOAT NULL,
  `FechaCreacion` DATE NULL,
  `FechaActualizacion` DATE NULL,
  PRIMARY KEY (`IdObjetos`),

    FOREIGN KEY (`IdCajaFuertes`)
    REFERENCES `storage_sync_vault`.`CajaFuertes` (`IdCajaFuertes`),

    FOREIGN KEY (`IdUsuarios`)
    REFERENCES `storage_sync_vault`.`Usuarios` (`IdUsuarios`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `storage_sync_vault`.`ObjetosEliminados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `storage_sync_vault`.`ObjetosEliminados` (
  `IdObjetosEliminados` CHAR(36) NOT NULL,
  `IdObjetos` CHAR(36) NOT NULL,
  `FechaEliminado` DATE NULL,
  PRIMARY KEY (`IdObjetosEliminados`),
    FOREIGN KEY (`IdObjetos`)
    REFERENCES `storage_sync_vault`.`Objetos` (`IdObjetos`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `storage_sync_vault`.`ObjetosCompartidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `storage_sync_vault`.`ObjetosCompartidos` (
  `IdObjetosCompartidos` CHAR(36) NOT NULL,
  `IdUsuarios` CHAR(36) NOT NULL,
  `IdObjetos` CHAR(36) NOT NULL,
  PRIMARY KEY (`IdObjetosCompartidos`),
    FOREIGN KEY (`IdUsuarios`)
    REFERENCES `storage_sync_vault`.`Usuarios` (`IdUsuarios`),
    FOREIGN KEY (`IdObjetos`)
    REFERENCES `storage_sync_vault`.`Objetos` (`IdObjetos`)
)
ENGINE = InnoDB;


drop table if exists ObjetosCompartidos;
drop table  if exists ObjetosEliminados;
drop table  if exists ObjetosCajaFuertes;
drop table if exists Objetos;
drop table if exists CajaFuertes;
drop table if exists Usuarios;
drop table if exists Planes;