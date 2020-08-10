import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { db } from '../../config/firestore';

class ProductoList extends Component {
    state = {
        listaProductos: []
    }

    componentDidMount() {
        this.obtenerProductos();
    }
    creaNuevoProducto = () => {
        // console.log('Nuevo producto');
        // console.log('Props del componente ProductoList: ', this.props)
        this.props.history.push('/productos/nuevo')
    }

    obtenerProductos = () => {
        let listaTemporal = [];
        db.collection('productos').get()
        .then((snap) => {
            snap.forEach((documento) => {
                // console.log(documento.id)
                // console.log(documento.data())
                listaTemporal.push({id: documento.id, ...documento.data()});
            })
            this.setState({listaProductos: listaTemporal});
            // console.log('Lista de productos recuperada: ', this.state)
            //NO HACER DE ESTA FORMA
            // this.setState({
            //     listaProductos:documento.data()
            // })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    renderListaProductos = () => {
        return this.state.listaProductos.map((documento) => {
            return (
                // key es un identificador unico
                <tr key={documento.id}> 
                    <td>{documento.producto}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.precioVenta}</td>
                    <td><Link to={`/productos/editar/${documento.id}`}>Editar</Link> | <a href='#'>Borrar</a></td>
                </tr>
            )
        })
    }

    render() {
        const filasGeneradasdeLaTabla =  this.renderListaProductos();
        return (
            <div>
               <Row>
                   <Col>Productos</Col>
               </Row>
               <Row>
                   <Col>
                        <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            {/* <th>Fecha de Carga</th> */}
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>{filasGeneradasdeLaTabla}
                                    </tbody>
                        </Table>
                        </Col>
               </Row>
               <Row>
                   <Col>
                        <Button variant="primary" onClick={this.creaNuevoProducto} >Agregar Producto</Button> {' '}
                        <Button variant="danger" onClick={()=> {console.log('ProductoList state: ', this.state)}} >Ver state</Button>
                   </Col>
               </Row>
            </div>

        )
                
            
        
    }
}


export default withRouter(ProductoList);