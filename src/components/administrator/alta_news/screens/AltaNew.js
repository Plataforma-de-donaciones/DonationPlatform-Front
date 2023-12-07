import NewBox from "../components/NewBox";
import styled from "styled-components";
import Layout from "./../../../generales/src/components/layout/Layout";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
`;

const Content = styled.div`
  grid-row: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
`;

function AltaNew(props) {
  return (
    <Layout isFluid sidebar>
      <NewBox />
    </Layout>
  );
}

export default AltaNew;
