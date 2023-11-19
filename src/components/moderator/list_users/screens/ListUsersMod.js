import ListadoUsuarios from "../components/ListadoUsuarios";
import Layout from "../../../generales/src/components/layout/Layout";

const ListUsersMod = () => {
  return (
    <Layout isModerator sidebar isFluid>
      <ListadoUsuarios />
    </Layout>
  );
};

export default ListUsersMod;
