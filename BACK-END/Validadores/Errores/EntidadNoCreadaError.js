class EntidadNoCreadaError extends Error {
  constructor(message) {
    super(message);
    this.name = "EntidadNoCreadaError";
  }
}
export default EntidadNoCreadaError;
