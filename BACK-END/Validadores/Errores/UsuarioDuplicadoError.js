class UsuarioDuplicadoError extends Error {
  constructor(message) {
    super(message);
    this.name = "UsuarioDuplicadoError";
  }
}
export default UsuarioDuplicadoError;
