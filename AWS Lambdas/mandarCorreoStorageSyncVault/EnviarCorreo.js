import SibApiV3Sdk from "sib-api-v3-sdk";
import { config } from "dotenv";
config();

const enviarCorreo = async (datos) => {
  console.log("coreeooooooooo");
  console.log(datos);
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  var defaultClient = SibApiV3Sdk.ApiClient.instance;
  const key = process.env.API_KEY_CORREO;
  console.log(key);
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = key;
  const { Correo, Nombres, TokenAcceso } = datos;
  const sendSmtpEmail2 = {
    sender: {
      name: "Contacto",
      email: "jesusmarzo7@gmail.com",
    },
    to: [
      {
        email: Correo,
        name: Nombres,
      },
    ],
    subject: "Comprueba tu cuente de Storage Sync Vault",
    htmlContent: `<p >Hola: ${Nombres}, comprueba tu cuenta en Storage Sync Vault.</p>
      <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
          <a href="http://localhost:5173/confirmar/${TokenAcceso}">Comprobar Cuenta</a></p>
          <p>Si tu no creaste esta cuenta, puedes ignorar este enlace</p>
  `,
    headers: {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    },
  };
  // throw new Error("x");

  // const respuesta = await apiInstance.sendTransacEmail(sendSmtpEmail2);

    await apiInstance.sendTransacEmail(sendSmtpEmail2).then(
      function (data) {
        console.log("API called successfully. Returned data: ");
      },
      function (error) {
        console.log("---------------enviarCorreo---------------");
        console.error(error);
      }
    );
};

export { enviarCorreo };
