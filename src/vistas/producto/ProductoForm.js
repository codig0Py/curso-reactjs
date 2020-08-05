import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { db } from '../../config/firestore';



class ProductoForm extends Component {
    state={
        producto: '',
        precioCompra: 0,
        precioVenta: 0,
    }

    guardarProducto = () => {
        let datosFinales = {
            producto: this.state.producto,
            precioCompra: this.state.precioCompra,
            precioVenta: this.state.precioVenta,
        }
        console.log(this.state);
        db.collection("productos").add(datosFinales)
        .then(() => {
            alert('Producto agregado con exito');
        })
        .catch((error) => {
            console.log('ERROR: ', error)
        })
    }

    setInputs = (evento) => {
        this.setState({[evento.target.name]: evento.target.value})
    }
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
                                <Form.Label>Producto</Form.Label>
                                <Form.Control type="text" name="producto"  onChange={this.setInputs}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Precio compra</Form.Label>
                                <Form.Control type="number" name="precioCompra"  onChange={this.setInputs}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Precio venta</Form.Label>
                                <Form.Control type="number" name="precioVenta" onChange={this.setInputs}/>
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
                        <Button variant="primary" onClick={this.guardarProducto}>Guardar</Button>{' '}
                        <Button variant="danger" onClick={() => {this.props.history.goBack()}}>Volver</Button>
                    </Col>
                </Row>
                
            </>
        )
    }
}

export default withRouter(ProductoForm)