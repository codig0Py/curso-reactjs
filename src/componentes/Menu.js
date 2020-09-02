import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


class Menu extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer  exact to="/"><Nav.Link >Home</Nav.Link></LinkContainer>
                            <LinkContainer to="/productos"><Nav.Link >Producto</Nav.Link></LinkContainer>
                            <LinkContainer to="/productosv2"><Nav.Link >Producto Version 2</Nav.Link></LinkContainer>
                            <LinkContainer to="/movimientos"><Nav.Link >Movimientos</Nav.Link></LinkContainer>
                            {/* <LinkContainer to="/signup"><Nav.Link >Registro de Usuarios</Nav.Link></LinkContainer> */}
                           {/* <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                            <Nav.Link ><Link to="/productos">Productos</Link></Nav.Link> */}
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Email Usuario:{`${this.props.usuario}`}<a href='#' onClick={this.props.salir}> | Salir</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                        {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Navbar.Collapse>
                </Navbar>
                
            </div>
        )
    }
}

export default  Menu;
