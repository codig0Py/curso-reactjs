import React, { Component } from 'react';
import { Row, Col, Button, Table, Form } from 'react-bootstrap';
import firebase, { db } from '../../config/firestore';

// function unsubscribe() {
//     return function(){
//         x+y
//     }
// }

// let z = unsubscribe();
// z = function(){
//     x+y
// }

// z();


class ProductoFormv2 extends Component {
    state={
        producto: '',
        precioCompra: 0,
        precioVenta: 0,
        listaProductos: [],
        desuscribirse:  null
    }
    componentDidMount() {
        this.obtenerProductos();
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
             this.setState({listaProductos: listaTemporal, desuscribirse: unsubscribe });
        }, (error) => {
            alert('Error al recuperar productos');
        })
        
    }

    componentWillUnmount(){
        this.state.desuscribirse();
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
    render() {
        return(
            <div>
                {/* INICIO DEL FORMULARIO */}
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
               {/* FIN DEL FORMULARIO */}
               {/* INICIO DE LA TABLA DE PRODUCTOS */}
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
                                    <tbody>
                                        {this.renderListaProductos()}
                                    </tbody>
                        </Table>
                    </Col>
               </Row>

               {/* FIN DE LA TABLA DE PRODUCTOS */}
            </div>
        )
    }

}

export default ProductoFormv2;