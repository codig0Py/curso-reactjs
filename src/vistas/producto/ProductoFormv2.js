import React, { Component } from 'react';
import { Row, Col, Button, Table, Form } from 'react-bootstrap';
import firebase, { db } from '../../config/firestore';
import moment from 'moment';
import ProductoInforme from './ProductoInforme';
import NumberFormat from 'react-number-format';

//Iconos 
import { VscEdit } from "react-icons/vsc";

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
        desuscribirse:  null,
        productoEditarId: null,
        buscarPorNombre: '',
        buscarPorPrecioCompra: '',
        verFiltros: false
    }
    componentDidMount() {
        this.obtenerProductos();
    }
   
    setInputs = (evento) => {
        this.setState({[evento.target.name]: evento.target.value})
    }
    guardarProducto = () => {
        if(this.state.productoEditarId) {
            db.collection("productos").doc(`${this.state.productoEditarId}`).update({
                producto: this.state.producto,
                precioCompra: this.state.precioCompra,
                precioVenta: this.state.precioVenta,
            })
            .then(() => {
                alert('Producto actualizado con exito');
                this.setState({
                    productoEditarId: null
                })
            })
            .catch((error) => {
                console.log('ERROR: ', error)
            })
        } else {
            db.collection("productos").add({
                producto: this.state.producto,
                precioCompra: this.state.precioCompra,
                precioVenta: this.state.precioVenta,
                // creado: firebase.firestore.FieldValue.serverTimestamp()
                creado: moment().unix()
            })
            .then(() => {
                alert('Producto agregado con exito');
            })
            .catch((error) => {
                console.log('ERROR: ', error)
            })
        }
        this.limpiarCampos();
    }
    obtenerProductos = () => {
        let listaTemporal = [];
        let unsubscribe = db.collection('productos').orderBy('creado')
        .onSnapshot((snap) => {
             listaTemporal = [];
             snap.forEach((documento) => {
                 listaTemporal.push({id: documento.id, ...documento.data()});
             })
             this.setState({listaProductos: listaTemporal, desuscribirse: unsubscribe });
        }, (error) => {
            alert('Error al recuperar productos');
        })
        
    }

    componentWillUnmount(){
        if(this.state.desuscribirse) {
            this.state.desuscribirse();
        }
        
    }

    renderListaProductos = () => {
        return this.state.listaProductos.filter((documento) => {
            return documento.producto.toLowerCase().indexOf(this.state.buscarPorNombre.toLowerCase()) >= 0 && (documento.precioCompra.toString().indexOf(this.state.buscarPorPrecioCompra) >= 0 )
        })
        .map((documento, index) => {
            let orden = index + 1;
            return (
                // key es un identificador unico
                <tr key={documento.id}> 
                    <td style={{textAlign:"center"}}>{orden}</td>
                    <td>{documento.producto}</td>
                    <td style={{textAlign:"center"}}>{documento.precioCompra}</td>
                    <td style={{textAlign:"center"}}>{documento.precioVenta}</td>
                    <td style={{textAlign:"center"}}>{moment.unix(documento.creado).format('DD/MM/YYYY')}</td>
                    <td style={{textAlign:"center"}}><VscEdit onClick={() => this.cargarDatosForm(documento.id)}/></td>
                    {/* <td><a href='#' onClick={() => this.cargarDatosForm(documento.id)}>Editar</a></td> */}
                </tr>
            )
        })
    }
    cargarDatosForm = (productoId) => {
        db.collection('productos').doc(`${productoId}`).get()
        .then((snap)=> {
            // console.log('Datos del producto recuperado: ', snap.data())
            this.setState({
                producto: snap.data().producto,
                precioCompra: snap.data().precioCompra,
                precioVenta: snap.data().precioVenta,
                productoEditarId: snap.id
            })
        })
        .catch((error) => {
            console.log('ERROR: ', error)
        })

    }

    limpiarCampos = () => {
        this.setState({
            producto: '',
            precioCompra: 0,
            precioVenta: 0,
            productoEditarId: null
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
                                <Form.Control type="text" name="producto" value={this.state.producto} onChange={this.setInputs}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Precio compra</Form.Label>
                                {/* <Form.Control type="number" name="precioCompra" value={this.state.precioCompra} onChange={this.setInputs}/> */}
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                                <br/>
                                <NumberFormat style={{borderColor: '#f3f3f3'}} thousandSeparator={true} suffix={' Guaranies'}/>      
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Precio venta</Form.Label>
                                <Form.Control type="number" name="precioVenta" value={this.state.precioVenta} onChange={this.setInputs}/>
                                {/* <Form.Text className="text-muted">
                                    Campo obligatorio
                                </Form.Text> */}
                            </Form.Group>
                            
                        </Col>
                    </Row>
               </Form>
               <Row>
                    <Col md={4}>
                        <Button variant="primary" onClick={this.guardarProducto}>Guardar</Button>{' '}
                        <Button variant="warning" onClick={this.limpiarCampos}>Limpiar campos</Button>{' '}
                        <Button variant="info" onClick={() => this.setState({verFiltros: !this.state.verFiltros})}>Activar filtros</Button>{' '}
                        
                    </Col>
                    <Col md={{ span: 2, offset: 6 }}>
                            <ProductoInforme name="Productos" labels={[{label:'Producto', value:'producto' }, {label:'Precio Compra', value:'precioCompra' }, {label:'Precio Venta', value:'precioVenta' }]} productos={this.state.listaProductos}/>
                    </Col>
                </Row>
               <br/>
               {/* FIN DEL FORMULARIO */}
               {/* INICIO DE LA TABLA DE PRODUCTOS */}
               {/* <Row>
                   <Col md={{ span: 2, offset: 10 }}>    
                        <ProductoInforme productos={this.state.listaProductos}/>
                   
                   </Col>
               </Row>
               <br/> */}
               <Row>
                   <Col md={12}>
                        <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign:"center"}}>#</th>
                                            <th>Producto {this.state.verFiltros == true?<Form.Control type="text" name="buscarPorNombre" value={this.state.buscarPorNombre} onChange={this.setInputs}/>: null } </th>
                                            <th style={{textAlign:"center"}}>Precio Compra {this.state.verFiltros == true? <Form.Control type="text" name="buscarPorPrecioCompra" value={this.state.buscarPorPrecioCompra} onChange={this.setInputs}/>: null}</th>
                                            <th style={{textAlign:"center"}}>Precio Venta</th>
                                            <th style={{textAlign:"center"}}>Fecha de Carga</th>
                                            <th style={{textAlign:"center"}}>Acciones</th>
                                            
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