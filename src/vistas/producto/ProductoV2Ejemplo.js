import React, { Component } from 'react';
import { Row, Col, Button, Table, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import firebase, { db } from '../../config/firestore';

class ProductoV2Ejemplo extends Component {
    state = {
        producto: '',
        precioCompra: 0,
        precioVenta: 0,
        listaProductos: [],
        unsubscribe: null
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
        let unsubscribe = db.collection('productos').orderBy('creado')
        .onSnapshot((snap) => {
            // console.log(snap);
            listaTemporal = [];
            snap.forEach((documento) => {
                // console.log(documento.id)
                listaTemporal.push(documento.data());
            })
            this.setState({listaProductos: listaTemporal, unsubscribe});
        }, (error) => {
            alert('Error al recuperar productos');
        })
        
    }

    renderListaProductos = () => {
        return this.state.listaProductos.map((documento, index) => {
            let orden = index + 1;
            return (
                // key es un identificador unico
                <tr key={documento.producto}> 
                    <td>{orden}</td>
                    <td>{documento.producto}</td>
                    <td>{documento.precioCompra}</td>
                    <td>{documento.precioVenta}</td>
                </tr>
            )
        })
    }
    setInputs = (evento) => {
        this.setState({[evento.target.name]: evento.target.value})
    }
    guardarProducto = () => {
        let datosFinales = {
            producto: this.state.producto,
            precioCompra: this.state.precioCompra,
            precioVenta: this.state.precioVenta,
            creado: firebase.firestore.FieldValue.serverTimestamp()
        }
        // console.log(this.state);
        db.collection("productos").add(datosFinales)
        .then(() => {
            alert('Producto agregado con exito');
        })
        .catch((error) => {
            console.log('ERROR: ', error)
        })
    }
    componentWillUnmount(){
        this.state.unsubscribe();
    }

    render() {
        const filasGeneradasdeLaTabla =  this.renderListaProductos();
        return (
            <div>
               {/* <Row>
                   <Col>Productos</Col>
               </Row> */}
               <Form>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Producto</Form.Label>
                                <Form.Control type="text" name="producto"  onChange={this.setInputs}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Precio compra</Form.Label>
                                <Form.Control type="number" name="precioCompra"  onChange={this.setInputs}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Precio venta</Form.Label>
                                <Form.Control type="number" name="precioVenta" onChange={this.setInputs}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            
                        </Col>
                    </Row>
               </Form>
               <Row>
                    <Col md={6}>
                        <Button variant="primary" onClick={this.guardarProducto}>Agregar</Button>{' '}
                    </Col>
                </Row>
                <br/>
               <Row>
                   <Col>
                        <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Producto</th>
                                            <th>Precio Compra</th>
                                            <th>Precio Venta</th>
                                            {/* <th>Fecha de Carga</th> */}
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


export default withRouter(ProductoV2Ejemplo);