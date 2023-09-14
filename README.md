# Storage Sync Vault

## Tabla de Contenidos

1. [🚀 Informacion General](#-informacion-general)
2. [💻 Tecnologias](#-tecnologias)
3. [🛠️ Instalacion](#%EF%B8%8F-instalacion)

## 🚀 Informacion General

---

<p align="justify">
Storage Sync Vault es un servicio similar a Mega o Dropbox, el cual permite almacenar archivos de todo tipo (documentos personales, fotografías, videos, y un larguísimo etcétera) de una forma mucho más segura para los usuarios y, sobre todo, para la propia página.
</p>

<div align="justify">

🔓**Funcionalidades publicas:**

- Crear cuenta ( _Usando Github 🚧 En construccion_  )
- Confirmar cuenta por medio de un token enviado al email( _Pendiente el envio del email_ )
- Inicio de sesion

🔐**Funcionalidades privadas( _Una vez confirmada la cuenta y haber iniciado sesion_ )**:

- Crear folders
- Obtener los elementos de los folders
- Eliminar folders incluyendo su contenido( _Archivos y sub-folders_ )
- Recuperar folders eliminados( _Los folders restaurados se mueven al directorio raiz /_ )
- Mover de lugar los folders
- Compartir folders con otros usuarios para su lectura
- Subir archivos a los folders
- Obtener informacion de un archivo
- Eliminar archivo
- Recuperar archivo
- Mover archivo
- Compartir archivo con otros usuarios para su lectura

</div>

## 💻 Tecnologias

---

<div align="center">

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node JS" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express JS" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" alt="Sequelize" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/AWS_RDS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS RDS" />&nbsp;&nbsp;

</div>

🧠**Principales tecnologias usadas para el Back-End:**

- **NodeJS**: Version 18.14.2
- **Express**: Version 4.18.2
- **Sequelize**: Version 6.32.1
- **Multer**: Version 1.4.5-lts.1
- **JWT**: Version 9.0.1

🎨**Principales tecnologias usadas para el Front-End:**

💾**Bases de datos**:

- **MySQL**: Version *

☁️**Cloud**:

- **AWS RDS**

## 🛠️ Instalacion

---

<p align="justify">

Para la instalacion, debe de contar con ```node 18.14.2``` y luego seguir los pasos siguientes.

La aplicacion esta dividida en 2 proyectos, una API Rest y un Front-End.

📂 Para ejecutar el Back-End debe hacer lo siguiente:

</p>

```
$ git clone https://github.com/JDOV7/Storage_Sync_Vault.git
$ cd ../path/to/the/dir/StorageSyncVault/BACK-END
$ npm install
$ npm run dev
```

<p align="justify">

🔑El back-end requiere las siguientes ```variables de entorno```:

</p>

```
PORT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=
JWT_SECRET=
```


<p align="justify">
📂Para ejecutar el Front-End se debe hacer lo siguiente una vez clonado el repositorio:
</p>

```
$ cd ../path/to/the/dir/StorageSyncVault/FRONT-END
$ npm install
$ npm run dev
```


<p align="justify">
Ademas de esto se debe tener una base de datos en MySQL y tener una cuenta en mailtrap para probar los correos.
</p>
