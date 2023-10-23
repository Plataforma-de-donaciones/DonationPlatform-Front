import React from "react";

function ContactoButton(props) {
  return (
    <button style={styles.container}>
      <span style={styles.contacto}>Contacto</span>
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
    borderRadius: "5px", // Usamos un valor en píxeles para el borde redondeado
    cursor: "pointer", // Agregamos un cursor para indicar que es interactivo
    border: "none", // Eliminamos el borde
    outline: "none", // Eliminamos el borde enfocado
  },
  contacto: {
    color: "rgba(255,255,255,1)",
    fontSize: "14px", // Tamaño de fuente en píxeles
  },
};

export default ContactoButton;
