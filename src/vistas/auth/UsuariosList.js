import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { db } from '../../config/firestore';

import { VscEdit, VscTrash } from "react-icons/vsc";

class UsuariosList extends Component {
    state = {
        listaUsuarios: []
    }

    componentDidMount() {
        this.obtenerUsuarios();
    }
   
    obtenerUsuarios = () => {
        let listaTemporal = [];
        db.collection('usuarios').get()
        .then((snap) => {
            snap.forEach((documento) => {
                listaTemporal.push({id: documento.id, ...documento.data()});
            })
            this.setState({listaUsuarios: listaTemporal});
        })
        .catch((error) => {
            console.log(error)
        })
    }


    renderListaUsuarios = () => {
        return this.state.listaUsuarios.map((documento) => {
            return (
                // key es un identificador unico
                <tr key={documento.id}> 
                    <td>{documento.email}</td>
                    <td style={{textAlign:"center"}}>
                        <Link to={`/usuarios/roles/${documento.id}`}><VscEdit/></Link>
                    </td>
                </tr>
            )
        })
    }

    render() {
        const filasGeneradasdeLaTabla =  this.renderListaUsuarios();
        return (
            <div>
               <Row>
                   <Col>Usuarios</Col>
               </Row>
               <br/>
               <Row>
                   <Col>
                        <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {/* <th>#</th> */}
                                            <th>Email</th>
                                            <th style={{textAlign:"center"}}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>{filasGeneradasdeLaTabla}
                                    </tbody>
                        </Table>
                        </Col>
               </Row>
               
            </div>

        )
                
            
        
    }
}


export default UsuariosList;