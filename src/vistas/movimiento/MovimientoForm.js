import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import moment from 'moment';
import { db } from '../../config/firestore';




class MovimientoForm extends Component {
    state={
        fecha: ''
    }

    

    setInputs = (evento) => {
        this.setState({[evento.target.name]: evento.target.value})
    }

    guardar = () => {
        console.log('States: ', moment(this.state.fecha).format('DD-MM-YYYY'));
        db.collection('movimientos').add(this.state)
        .catch(error => {
            console.log('Error: ', error)
        })
    }
    render() {
        return (
            <>
                <Row>
                    <Col><h1>Nuevo Movimiento</h1></Col>
                </Row>
                <Row>
                    <Col xs={4} md={6}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Producto</Form.Label>
                                <Form.Control type="date" name="fecha" value={this.state.fecha} onChange={this.setInputs}/>
                            </Form.Group>


                        </Form>
                        <br/>
                        { this.state.fecha != ''? <p>Fecha seleccionada: {moment(this.state.fecha).format('DD-MM-YYYY')} </p>: null}
                    
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Button variant="primary" onClick={this.guardar}>Guardar</Button>{' '}
                        {/* <Button variant="danger" onClick={() => {this.props.history.goBack()}}>Volver</Button> */}
                    </Col>
                </Row>
                
            </>
        )
    }
}

export default MovimientoForm