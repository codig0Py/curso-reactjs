import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
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
                // console.log(documento.data())
                listaTemporal.push(documento.data());
            })
            this.setState({listaProductos: listaTemporal});
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
                <tr key={documento.producto}> 
                    <td>{documento.producto}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.precioVenta}</td>
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