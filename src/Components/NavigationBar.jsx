import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import Cart from './Cart';


export default function NavigationBar() {
    return(
        <Navbar
        expand="xl"
        bg="dark"
        variant="dark"
        >
        <Container fluid="sm">
        <Navbar.Brand as={Link} to={{ pathname: "/" }}>
          AtelierRemote
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={{ pathname: "/menu" }}>
            Nasze Menu
          </Nav.Link>
          <Nav.Link as={Link} to={{ pathname: "/cook" }}>
            Menu Kucharza
          </Nav.Link>
          <Nav.Link as={Link} to={{ pathname: "/cookPanel" }}>
            Panel Kucharza
          </Nav.Link>
          <Nav.Link as={Link} to={{ pathname: "/dinnerTables" }}>
            Rezerwacja stołu
          </Nav.Link>
          <Nav.Link as={Link} to={{ pathname: "/contactUs" }}>
            Kontakt
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
            <Cart/>
        </Nav>
      </Container>
        </Navbar>
    );
}