class UsuarioInvalidoError extends Error {
    constructor(message) {
      super(message);
      this.name = "UsuarioInvalidoError";
    }
  }
  export default UsuarioInvalidoError;
  