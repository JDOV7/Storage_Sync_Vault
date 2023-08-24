# Storage Sync Vault

## Tabla de Contenidos
1. [🚀 Informacion General](#-informacion-general)
2. [💻 Tecnologias](#-tecnologias)
3. [🛠️ Instalacion](#%EF%B8%8F-instalacion)
## 🚀 Informacion General
***

Storage Sync Vault es un servicio similar a Mega o Dropbox, el cual permite almacenar archivos de todo tipo (documentos personales, fotografías, videos, y un larguísimo etcétera) de una forma mucho más segura para los usuarios y, sobre todo, para la propia página.

Funcionalidades: 
* Crear cuenta
* Confirmar cuenta por medio de un token enviado al email
* Logeo


## 💻 Tecnologias
***
![JavaScript](https://img.shields.io/badge/JavaScript-marker?logo=javascript&logoColor=black&color=F7DF1E) ![NodeJS](https://img.shields.io/badge/NodeJS-marker?logo=nodedotjs&labelColor=white) ![Express](https://img.shields.io/badge/Express-marker?color=white) ![MySQL](https://img.shields.io/badge/MySQL-marker?logo=mysql&logoColor=black&labelColor=white&color=67B8D5) ![Sequelize](https://img.shields.io/badge/Sequelize-marker?logo=sequelize&logoColor=67B8D5&labelColor=white&color=67B8D5) 

 Principales tecnologias usadas para el Back-End:
* NodeJS: Version 18.14.2
* Express: Version 4.18.2
* MySQL: Version *
* Sequelize: Version 6.32.1
* Multer: Version 1.4.5-lts.1

Principales tecnologias usadas para el Front-End:


## 🛠️ Instalacion
***
Para la instalacion, primero se debe tener instalado```node 18.14.2``` y luego seguir los pasos siguientes.

La aplicacion esta dividida en 2 proyectos, una API Rest y un Front-End.

Para ejecutar el Back-End se debe hacer lo siguiente:

```
$ git clone https://github.com/JDOV7/Storage_Sync_Vault.git
$ cd ../path/to/the/dir/BACK-END
$ npm install
$ npm run dev
```

Para ejecutar el Front-End se debe hacer lo siguiente una vez clonado el repositorio:

```
$ cd ../path/to/the/dir/FRONT-END
$ npm install
$ npm run dev
```

Ademas de esto se debe tener una base de datos en MySQL y tener una cuenta en mailtrap para probar los correos.