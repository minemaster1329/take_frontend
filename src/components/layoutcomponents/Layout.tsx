import React from "react";
import {Container} from "reactstrap";
import NavMenu from "./NavMenu";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";

export default function Layout(){
    return(
        <Container>
            <NavMenu/>
            <Outlet/>
            <Footer/>
        </Container>
    )
}