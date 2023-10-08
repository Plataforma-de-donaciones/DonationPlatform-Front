import React from "react";

function CancelarButton(props) {
  return (
    <button style={styles.container}>
      <span style={styles.cancelarText}>Cancelar</span>
    </button>
  );
}

const styles = {
  container: {
    backgroundColor: "rgba(155,155,155,1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: "100px", // Usamos un valor en píxeles para el borde redondeado
    boxShadow: "0px 1px 5px 0.35px rgba(0,0,0,0.35)", // Sombra en CSS
    minWidth: "88px", // Ancho mínimo
    padding: "8px 16px", // Espaciado
    border: "none", // Eliminamos el borde
    outline: "none", // Eliminamos el borde enfocado
    cursor: "pointer", // Agregamos un cursor para indicar que es interactivo
  },
  cancelarText: {
    color: "#fff",
    fontSize: "14px", // Tamaño de fuente en píxeles
  },
};

export default CancelarButton;
