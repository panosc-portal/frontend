import React, { useEffect, useContext } from "react";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";
import { H1 } from "../components/Commons";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const { setToken, setIsAuthenticated } = useContext(UserContext);
  useEffect(() => setToken("") || setIsAuthenticated(false), [
    setIsAuthenticated,
    setToken
  ]);
  return (
    <Layout>
      <section>
        <H1>The Photon and Neutron Open Science Cloud (PaNOSC)</H1>
        <About>
          The Photon and Neutron Open Science Cloud (PaNOSC) is a European
          project for making FAIR data a reality in 6 European Research
          Infrastructures (RIs), developing and providing services for
          scientific data and connecting these to the European Open Science
          Cloud (EOSC).
        </About>
        <About>Please login to continue. (login: user, password: pass)</About>
        <LoginForm />
      </section>
    </Layout>
  );
};

export default LoginPage;

const Layout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const About = styled.p`
  width: 70rem;
`;
