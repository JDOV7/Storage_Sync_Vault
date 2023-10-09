# Storage Sync Vault

## Tabla de Contenidos

1. [🚀 Informacion General](#-informacion-general)
2. [💻 Tecnologias](#-tecnologias)
3. [🛠️ Instalacion](#%EF%B8%8F-instalacion)

## 🚀 Informacion General

---

<p align="justify">
Storage Sync Vault es un servicio de almacenamiento de archivos( <i>Drive, OneDrive, DropBox</i> ) para usuarios finales y empresas. Con Storage Sync Vault podras almacenar cualquier tipo de archivo ( <strong>imagenes, videos, documentos, etc</strong> ) de una forma segura, tambien podras acceder a ellos desde cualquier dispositivo de forma rapida unicamente iniciando sesion.

</p>

<div align="justify">

🔓**Funcionalidades publicas:**

- Crear cuenta ( _Usando Github, Facebook y Local_  )
- Confirmar cuenta por medio de un token enviado al email( _Pendiente el envio del email, pero si sirve el endpoint_ )
- Inicio de sesion ( _Usando Github, Facebook y Local_ )

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
<img src="https://img.shields.io/badge/OAuth%202.0-badge?style=for-the-badge&logo=auth0&logoColor=%23EB5424&labelColor=black&color=black" alt="OAuth 2.0" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />&nbsp;&nbsp;
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

<p align="center">🚧 En construccion 🚧</p>

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

CLIENT_ID_GITHUB=
CLIENT_SECRET_GITHUB=
URL_ACCESS_TOKEN_GITHUB=https://github.com/login/oauth/access_token
URL_USER_DATA_GITHUB=https://api.github.com/user
URL_USER_EMAIL_GITHUB=https://api.github.com/user/emails

CLIENT_ID_FACEBOOK=
CLIENT_SECRET_FACEBOOK=
URL_ACCESS_TOKEN_FACEBOOK =https://graph.facebook.com/v18.0/oauth/access_token
URL_USER_DATA_FACEBOOK=https://graph.facebook.com/v18.0/me

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


Tambien se debe configurar su cuenta en Github para usar el servicio de OAuth.
</p>
