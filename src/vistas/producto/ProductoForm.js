import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class ProductoForm extends Component {
    render() {
        return (
            <>
                <Row>
                    <Col><h1>Nuevo Producto</h1></Col>
                </Row>
                <Row>
                    <Col xs={4} md={6}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nombre del producto</Form.Label>
                                <Form.Control type="text" placeholder="Inserte nombre del producto" />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control type="text" placeholder="Inserte descripcion del producto" />
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                        </Form>
                    
                    </Col>
                    {/* <Col xs={2} md={4}>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                    </Col> */}
                </Row>
                <Row>
                    <Col md={6}>
                        <Button variant="primary">Guardar</Button>{' '}
                        <Button variant="danger" onClick={() => {this.props.history.goBack()}}>Volver</Button>
                    </Col>
                </Row>
                
            </>
        )
    }
}

export default withRouter(ProductoForm)