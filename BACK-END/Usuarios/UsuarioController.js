import { nanoid } from "nanoid";
const obtenerElementos = async (req, res) => {
  try {
    // setTimeout(() => {
    //   return res.status(200).json({
    //     status: 200,
    //     message: "Todo salio bien",
    //     fecha: new Date().getTime(),
    //     TokenAccesoUsuario: `${nanoid(15)}${new Date().getTime()}${nanoid(15)}`,
    //     TokenAccesoCajaFuerte: `${nanoid(10)}`,
    //   });
    // }, 4000);
    return res.status(200).json({
      status: 200,
      message: "Todo salio bien",
      fecha: new Date().getTime(),
      TokenAccesoUsuario: `${nanoid(15)}${new Date().getTime()}${nanoid(15)}`,
      TokenAccesoCajaFuerte: `${nanoid(10)}`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Ocurrio un error en el servidor" });
  }
};

export { obtenerElementos };
