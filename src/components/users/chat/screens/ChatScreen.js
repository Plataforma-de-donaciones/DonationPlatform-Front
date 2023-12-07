import React from "react";
import ChatComponent from "../components/ChatComponent";
import { useParams } from "react-router-dom";
import Layout from "../../../generales/src/components/layout/Layout";

function ChatScreen(props) {
  const { convId } = useParams();

  return (
    <>
      <Layout>
        <ChatComponent convId={convId} />
      </Layout>
    </>
  );
}

export default ChatScreen;
