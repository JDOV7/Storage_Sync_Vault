import { customAlphabet } from "nanoid";

const creandoTokenAcceso = async () => {
  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_+*.",
    10
  );
  return nanoid(35) + new Date().getTime();
};

export default creandoTokenAcceso;
