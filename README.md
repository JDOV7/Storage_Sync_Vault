# Storage Sync Vault

## Tabla de Contenidos

1. [🚀 Informacion General](#-informacion-general)
2. [💻 Tecnologias](#-tecnologias)
3. [🛠️ Instalacion](#%EF%B8%8F-instalacion)
4. [✒️ Autores](#-Autores)

## 🚀 Informacion General

---

<p align="justify">
Storage Sync Vault es un servicio de almacenamiento de archivos( <i>Drive, OneDrive, DropBox</i> ) para usuarios finales y empresas. Con Storage Sync Vault podras almacenar cualquier tipo de archivo ( <strong>imagenes, videos, documentos, etc</strong> ) de una forma segura, tambien podras acceder a ellos desde cualquier dispositivo de forma rapida unicamente iniciando sesion.

</p>



🔓**Funcionalidades publicas:**

- Crear cuenta ( _Usando Github y Local_  )
- Confirmar cuenta por medio de un token enviado al email()
- Inicio de sesion ( _Usando Github y Local_ )

🔐**Funcionalidades privadas( _Una vez confirmada la cuenta y haber iniciado sesion_ )**:

- Crear folders
- Obtener los elementos de los folders
- Eliminar folders incluyendo su contenido( _Archivos y sub-folders_ )
- Recuperar folders eliminados( _Los folders restaurados se mueven al directorio raiz /_ )
- Mover de lugar los folders
- Compartir folders con otros usuarios para su lectura
- Respaldar folder y su contenido
- Subir archivos a los folders
- Obtener informacion de un archivo
- Eliminar archivo
- Recuperar archivo
- Mover archivo
- Compartir archivo con otros usuarios para su lectura
- Respaldar archivo
- Crear archivos Word, Excel y Power Point



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
<img src="https://img.shields.io/badge/AWS_LAMBDA-FF9900?style=for-the-badge&logo=awslambda&logoColor=white" alt="AWS Lambda" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/AWS_Api_Gateway-FF9900?style=for-the-badge&logo=amazonapigateway&logoColor=white" alt="AWS API Gateway" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/AWS S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white" alt="AWS S3" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/google_api_sheets-34A853?style=for-the-badge&logo=amazonapigateway&logoColor=white" alt="Google api Sheets" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/google_api_docs-4285F4?style=for-the-badge&logo=googledocs&logoColor=white" alt="Google api Docs" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/google_api_slides-FBBC04?style=for-the-badge&logo=googleslides&logoColor=white" alt="Google api Slides" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/google_api_drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white" alt="Google api drive" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white" alt="Ethereum" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/ipfs-65C2CB?style=for-the-badge&logo=ipfs&logoColor=white" alt="IPFS" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />&nbsp;&nbsp;
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />&nbsp;&nbsp;

</div>

🧠**Principales tecnologias usadas para el Back-End:**

- **NodeJS**: Version 18.14.2
- **Express**: Version 4.18.2
- **Sequelize**: Version 6.32.1
- **Multer**: Version 1.4.5-lts.1
- **JWT**: Version 9.0.1

🎨**Principales tecnologias usadas para el Front-End:**

- **Vite**: Version *
- **React**: Version *
- **Tailwind CSS**: Version *

💾**Bases de datos**:

- **MySQL**: Version *

☁️**Cloud**:

- **AWS Lambda**
- **AWS S3**
- **AWS Api Gateway**
- **Google Api Sheets**
- **Google Api Docs**
- **Google Api Slides**
- **Google Api Drive**
- **Github Api Oauth2**

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

RED_IPFS=
RED_ETH=

CONTRACT_ABI=
ACCOUNT_PRIVATE_KEY_ETH=
CONTRACT_ADDRESS_ETH=

CONTRACT_ABI_COMPARTIR_OBJECTO=
ACCOUNT_PRIVATE_KEY_ETH_COMPARTIR_OBJECTO=
CONTRACT_ADDRESS_ETH_COMPARTIR_OBJECTO=

CONTRACT_ABI_ARCHIVOS_GOOGLE=
ACCOUNT_PRIVATE_KEY_ETH_ARCHIVOS_GOOGLE=
CONTRACT_ADDRESS_ETH_ARCHIVOS_GOOGLE=

CLIENT_ID_GITHUB=
CLIENT_SECRET_GITHUB=
URL_ACCESS_TOKEN_GITHUB=https://github.com/login/oauth/access_token
URL_USER_DATA_GITHUB=https://api.github.com/user
URL_USER_EMAIL_GITHUB=https://api.github.com/user/emails



JWT_SECRET=jwt_super_secreto_para_la_app_storage_sync_vault


AWS_ACCESS_KEY_ID =
AWS_SECRET_ACCESS_KEY =
AWS_BUCKET =
AWS_REGION=
AWS_LAMBDA_ENVIO_CORREO_CONFIRMACION=
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

🔑El front-end requiere las siguientes ```variables de entorno```:

</p>

```
VITE_BACKEND_URL=
VITE_CLIENT_ID_GITHUB=
```


<p align="justify">

Ademas de esto se debe tener una base de datos en MySQL y se debe configurar su cuenta en Github para usar el servicio de OAuth. Y finalmente crear los contratos que se encuntran en el directorio ```Solidity```

</p>

## ✒️ Autores

---

* **Ochoa Virgen Jesus Daniel** - *Desarrollador* - [JDOV7](https://github.com/JDOV7)
* **Portugal Martinez Nadia** - *Desarrollador* - [nadiap26](https://github.com/nadiap26)