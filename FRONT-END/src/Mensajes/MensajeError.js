import Swal from "sweetalert2";

const mensajeError = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "error",
  });
};

export default mensajeError;
