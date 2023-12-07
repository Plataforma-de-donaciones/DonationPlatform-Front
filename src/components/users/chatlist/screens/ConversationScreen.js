import React, { useState } from "react";
import ConversationUser from "../components/ConversationUser";
import Layout from "./../../../generales/src/components/layout/Layout";

function ConversationScreen(props) {
  return (
    <Layout>
      <ConversationUser />
    </Layout>
  );
}

export default ConversationScreen;
