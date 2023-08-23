import { customAlphabet } from "nanoid";

const creandoTokenAcceso = async (longitud = 0) => {
  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_+*.",
    10
  );
  return longitud === 10
    ? nanoid(longitud)
    : nanoid(longitud) + new Date().getTime();
};

export default creandoTokenAcceso;
