import React, { useState } from "react";
import LoginBox from "../components/LoginBox";
import Layout from "../../../../generales/src/components/layout/Layout";

const Login = () => {
  return (
    <Layout  haveMenu={false} haveFooter={false}>
      <LoginBox />
    </Layout>
  );
};

export default Login;
