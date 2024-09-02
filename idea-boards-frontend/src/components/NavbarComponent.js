import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from './authComponents/context/AuthContext';

const NavbarComponent = () => {
    const { token, logout } = useContext(AuthContext);

    return (
        <Navbar style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }} expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>IdeaBoards</Navbar.Brand>
                </LinkContainer>
                <Nav className="ml-auto">
                    {!token ? (
                        <>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/signup">
                                <Nav.Link>Sign Up</Nav.Link>
                            </LinkContainer>
                        </>
                    ) : (
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
