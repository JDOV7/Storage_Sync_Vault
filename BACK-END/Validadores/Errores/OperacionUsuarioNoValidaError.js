class OperacionUsuarioNoValidaError extends Error {
  constructor(message) {
    super(message);
    this.name = "OperacionUsuarioNoValidaError";
  }
}
export default OperacionUsuarioNoValidaError;
