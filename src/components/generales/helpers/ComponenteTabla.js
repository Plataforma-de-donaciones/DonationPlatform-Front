import { useState } from "react";
import { Button, Table } from "react-bootstrap";

const ComponenteTabla = ({ headers, children, buttons }) => {
    return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {headers.map((titulo) => (
              <th>{titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
          {buttons}
        </tbody>
      </Table>
    </>
  );
};

export default ComponenteTabla;
