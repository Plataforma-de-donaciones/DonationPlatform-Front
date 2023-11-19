import ListadoNoticias from "../components/ListadoNoticias";
import Layout from "../../../generales/src/components/layout/Layout";

const ListNewsMod = () => {
  return (
    <Layout isFluid sidebar isModerator>
      <ListadoNoticias />
    </Layout>
  );
};

export default ListNewsMod;
