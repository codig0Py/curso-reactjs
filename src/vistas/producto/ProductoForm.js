import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
// import { db } from '../../config/firestore';
import moment from 'moment';



class ProductoForm extends Component {
    state={
        producto: '',
        precioCompra: 0,
        precioVenta: 0,
    }

    componentDidMount(){
        // console.log(this.props.match.params.id);
        if(this.props.match.params.id) {
            this.recuperarDatosProducto(this.props.match.params.id)
        }
    }

    recuperarDatosProducto = (productoId) => {
        // db.collection('productos').doc(`${productoId}`).get()
        // .then((snap)=> {
        //     console.log('Datos del producto recuperado: ', snap.data())
        //     this.setState({
        //         producto: snap.data().producto,
        //         precioCompra: snap.data().precioCompra,
        //         precioVenta: snap.data().precioVenta
        //     })
        // })
    }

    guardarProducto = () => {
        let datosFinales = {
            producto: this.state.producto,
            precioCompra: this.state.precioCompra,
            precioVenta: this.state.precioVenta,
        }

        // if(this.props.match.params.id) {
        //     db.collection("productos").doc(`${this.props.match.params.id}`).update(datosFinales)
        //     .then(() => {
        //         alert('Producto actualizado con exito');
        //     })
        //     .catch((error) => {
        //         console.log('ERROR: ', error)
        //     })

        // } else {
        //     db.collection("productos").add({...datosFinales, creado: moment().unix()})
        //     .then(() => {
        //         alert('Producto agregado con exito');
        //     })
        //     .catch((error) => {
        //         console.log('ERROR: ', error)
        //     })

        // }
        
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
                                <Form.Control type="text" name="producto" value={this.state.producto} onChange={this.setInputs}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Precio compra</Form.Label>
                                <Form.Control type="number" name="precioCompra" value={this.state.precioCompra} onChange={this.setInputs}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Precio venta</Form.Label>
                                <Form.Control type="number" name="precioVenta" value={this.state.precioVenta} onChange={this.setInputs}/>
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