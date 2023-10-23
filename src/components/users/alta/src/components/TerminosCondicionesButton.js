import React from "react";

function TerminosCondicionesButton(props) {
  return (
    <button style={styles.container}>
      <span style={styles.caption}>Términos y condiciones</span>
    </button>
  );
}

const styles = {
  container: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    cursor: "pointer", // Agregamos un cursor para indicar que es interactivo
    border: "none", // Eliminamos el borde
    outline: "none", // Eliminamos el borde enfocado
    padding: "10px 15px", // Ajustamos el espaciado
    fontSize: 14, // Tamaño de fuente
    color: "rgba(255, 255, 255, 1)", // Color de texto
  },
  acercaDe: {
    fontSize: "inherit", // Usamos el tamaño de fuente heredado
  },
};

export default TerminosCondicionesButton;
