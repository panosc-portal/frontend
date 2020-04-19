import React from "react"
import LoginForm from "../components/LoginForm"
import styled from "styled-components"
import { H1 } from "../components/Commons"

const LoginPage = () => (
    <Layout>
        <section><H1>Welcome to PaNOSC</H1>
            <LoginForm /></section>
    </Layout>
)

export default LoginPage

const Layout = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content:center;
`