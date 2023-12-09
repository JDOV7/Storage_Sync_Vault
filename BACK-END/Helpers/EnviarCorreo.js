import axios from "axios";
import { config } from "dotenv";
config();

const enviarCorreo = async (datos) => {
  try {
    const url = process.env.AWS_LAMBDA_ENVIO_CORREO_CONFIRMACION;
    const respuesta = await axios.post(url, datos);
    console.log(respuesta);
    console.log(respuesta.data);
  } catch (error) {
    console.log("----------------------enviarCorreo------------------");
    console.log(error);
  }
};

export { enviarCorreo };
