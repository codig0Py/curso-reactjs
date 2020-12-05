import React, { Component } from 'react';
import { Row, Col, Button, Table, Form } from 'react-bootstrap';
// import { db } from '../../config/firestore';
import moment from 'moment';

//Iconos 
import { VscEdit } from "react-icons/vsc";

class Roles extends Component {
    state={
        nombre: '', // nombre del rol
        listaRoles: [],
        desuscribirse:  null
    }
    componentDidMount() {
        this.obtenerRoles();
    }
   
    setInputs = (evento) => {
        this.setState({[evento.target.name]: evento.target.value})
    }
    guardarRol = () => {
        // db.collection("roles").add({
        //     nombre: this.state.nombre,
        //     creado: moment().unix()
        // })
        // .then(() => {
        //     alert('Rol agregado con exito');
        // })
        // .catch((error) => {
        //     console.log('ERROR: ', error)
        // })
        // this.limpiarCampos();
    }
    obtenerRoles = () => {
        // let listaTemporal = [];
        // let unsubscribe = db.collection('roles').orderBy('nombre')
        // .onSnapshot((snap) => {
        //      listaTemporal = [];
        //      snap.forEach((documento) => {
        //          listaTemporal.push({id: documento.id, ...documento.data()});
        //      })
        //      this.setState({listaRoles: listaTemporal, desuscribirse: unsubscribe });
        // }, (error) => {
        //     alert('Error al recuperar roles');
        // })
        
    }

    componentWillUnmount(){
        if(this.state.desuscribirse) {
            this.state.desuscribirse();
        }
        
    }

    renderListaRoles = () => {
        return this.state.listaRoles
        .map((documento, index) => {
            let orden = index + 1;
            return (
                // key es un identificador unico
                <tr key={documento.id}> 
                    <td style={{textAlign:"center"}}>{orden}</td>
                    <td>{documento.nombre}</td>
                </tr>
            )
        })
    }


    limpiarCampos = () => {
        this.setState({
            nombre: ''
        })
    }
    render() {
        return(
            <div>
                {/* INICIO DEL FORMULARIO */}
                <Form>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Roles</Form.Label>
                                <Form.Control type="text" name="nombre" value={this.state.nombre} onChange={this.setInputs}/>
                            </Form.Group>
                        </Col>
                    </Row>
               </Form>
               <Row>
                    <Col md={4}>
                        <Button variant="primary" onClick={this.guardarRol}>Guardar</Button>{' '}
                        <Button variant="warning" onClick={this.limpiarCampos}>Limpiar campos</Button>{' '}
                        
                    </Col>
                </Row>
               <br/>
               <Row>
                   <Col md={12}>
                        <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign:"center"}}>#</th>
                                            <th style={{textAlign:"center"}}>Nombre</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderListaRoles()}
                                    </tbody>
                        </Table>
                    </Col>
               </Row>
            </div>
        )
    }

}

export default Roles;