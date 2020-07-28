import React, { Component } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown, Form, FormControl, Table } from 'react-bootstrap';

class PruebaGrid extends Component {
    render(){
        return (
            <Container>
                {/* Menu */}
                <Row>
                    <Col>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">Logo - React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="#home">Inicio</Nav.Link>
                            <Nav.Link href="#home">Categorias</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                            <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                    </Col>
                </Row>
                {/* Contenido */}
                <Row>
                    <Col>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies, 
                            dui quis malesuada pulvinar, ligula nibh vestibulum purus, in rhoncus risus 
                            tortor id tortor. Quisque consequat lectus ac lorem dignissim posuere nec et 
                            tortor. Etiam consectetur tortor non tortor aliquet ornare. Etiam vitae diam 
                            sit amet sem tempus sodales. Lorem ipsum dolor sit amet, consectetur adipiscing 
                            elit. Suspendisse ut nibh sollicitudin mauris hendrerit rhoncus et ut ligula. 
                            Curabitur et egestas nisl. Integer gravida sem at lacus elementum gravida. 
                        </p>
                        <Button variant="primary">Guardar</Button>{' '}
                        <Button variant="outline-danger" size="lg">Cancelar</Button>{' '}
                        <Button variant="primary" size="lg" disabled> Primary button </Button>{' '}
                        
                    </Col>
                    <Col><p>Col 2</p></Col>
                    <Col><p>Col 3</p></Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Lista de Usuarios</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Registro de Usuarios</h2>
                        {/* Formulario  */}
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                {/* <Form.Label>Email address</Form.Label> */}
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                               Guardar
                            </Button>
                        </Form>
                    </Col>
                </Row>
                {/* Pie de la pagina */}
                <Row>
                    <Col><h2>Pie de pagina</h2></Col>
                </Row>
            </Container>
        )

    }
}


export default PruebaGrid;