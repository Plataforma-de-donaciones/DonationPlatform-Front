import NewBox from "../../../administrator/alta_news/components/NewBox";
import Layout from "./../../../generales/src/components/layout/Layout";


function AltaNewMod(props) {
  return (
    <Layout isFluid sidebar isModerator>
      <NewBox />
    </Layout>
  );
}

export default AltaNewMod;
