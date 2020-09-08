import React, { Component } from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { db } from '../../config/firestore';


export default class UsuarioRoles extends Component {

    state = {
        listaRoles : [], //roles obtenidos de la base de datos
        usuarioRoles: [] //roles del usuario enviado a la base de datos
    }

    componentDidMount = () => {
        this.obtenerRoles(); 
        this.obtenerRolesUsuario() 
    }
    handleCheckBox = (event) => {   
        // console.log(`${event.target.name}: `, event.target.checked);
        //Agregar rol
        if(event.target.checked) {
            //Verificamos si ya se selecciono el rol, si no agregamos a la lista
           let existe = this.state.usuarioRoles.includes(`${event.target.name}`);
           if(!existe){
             let nombreRol = `${event.target.name}`
             this.setState({
                usuarioRoles: [
                    ...this.state.usuarioRoles,
                    nombreRol
                ]
             })
           }
        } 

        if(!event.target.checked) {
             //Remover rol
             let existe = this.state.usuarioRoles.includes(`${event.target.name}`);
             if(existe){
                 let nombreRol = `${event.target.name}`;
                 let rolesFiltrado = this.state.usuarioRoles.filter((rol) => {
                    //  console.log('Rol actual: ', rol)
                    //  console.log('Son distintos: ',rol != nombreRol  )
                     return rol != nombreRol
                 });
                //  console.log('Roles despues de remover: ', rolesFiltrado)
                 this.setState({
                     usuarioRoles: [...rolesFiltrado]
                 })
                 
               }
        }
    
    }

    guardarRoles = () => {
        console.log('Id del usuario: ', this.props.match.params.usuarioId);
        console.log('Roles seleccionados: ', this.state.usuarioRoles)
        db.collection('usuarios').doc(this.props.match.params.usuarioId).update({roles: this.state.usuarioRoles})
        .then(() => {
            alert('Roles actualizados')
        })
        .catch(error => {
            alert('Error al actualizar roles ', error)
        })
    }
    obtenerRoles = () => {
        let listaTemporal = [];
        db.collection('roles').get()
        .then((snap) => {
            snap.forEach((documento) => {
                listaTemporal.push({id:documento.id, ...documento.data()})
            })
            this.setState({listaRoles: listaTemporal});
        })
        .catch(error => {
            console.log('Error: ', error)
        })
    }

    obtenerRolesUsuario = () => {
        db.collection('usuarios').doc(this.props.match.params.usuarioId).get()
        .then((usuario) => {
            // console.log('ROles del usuario: ', usuario.data().roles)
            this.setState({usuarioRoles: usuario.data().roles});
        })
        .catch(error => {
            console.log('Error: ', error)
        })

    }

    renderRoles = () => {
        return this.state.listaRoles.map((rol) => {
            let incluye = this.state.usuarioRoles.includes(`${rol.nombre}`);
            // console.log('INcluye: ', incluye)
            return (
                <Form.Group key={rol.id} >
                    <Form.Check type="checkbox" label={`${rol.nombre}`} name={`${rol.nombre}`}  onChange={this.handleCheckBox} checked={incluye} />
                </Form.Group> 
            )
        })
    }
    render() {
        return (
            <div style={{margin: "40px"}}>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Form>
                            { this.renderRoles()}
                            
                        </Form>
                        <Button variant="primary" onClick={this.guardarRoles}>Guardar</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
