class EntidadNoExisteError extends Error {
    constructor(message) {
      super(message);
      this.name = "EntidadNoExisteError";
    }
  }
  export default EntidadNoExisteError;
  