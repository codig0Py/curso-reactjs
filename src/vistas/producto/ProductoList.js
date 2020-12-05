import React, { Component } from 'react';
import { Row, Col, Button, Table , Form, Tooltip, OverlayTrigger} from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { secondaryDb } from '../../config/firestoreSecundario';

import { VscEdit, VscTrash } from "react-icons/vsc";



class ProductoList extends Component {
    state = {
        listaProductos: [],
        primerProductoVisible: '',
        ultimoProductoVisible: '',
        buscador: '',
        totalPrecioCompra: 0,
        totalPrecioVenta: 0
    }

    componentDidMount() {
        this.obtenerProductos();
    }

    setInputs = (evento) => {
        this.setState({[evento.target.name]: evento.target.value})
    }
    creaNuevoProducto = () => {
        // console.log('Nuevo producto');
        // console.log('Props del componente ProductoList: ', this.props)
        this.props.history.push('/productos/nuevo')
    }

    // siguiente = () => {
    //     console.log('Siguiente', this.state.ultimoProductoVisible.data())
    //     let listaTemporal = [];
    //     let totalPrecioCompraTemp = 0;
    //     let totalPrecioVentaTemp = 0;
    //     db.collection('productos')
    //     .orderBy('creado')
    //     .startAfter(this.state.ultimoProductoVisible)
    //     .limit(3)
    //     .get()
    //     .then((snap) => {
    //         console.log('snap.docs[0]', snap.docs[0])
    //         if(snap.docs[0]) {
    //             snap.forEach((documento) => {
    //                 totalPrecioCompraTemp = totalPrecioCompraTemp + parseInt(documento.data().precioCompra);
    //                 totalPrecioVentaTemp = totalPrecioVentaTemp + parseInt(documento.data().precioVenta)
    //                 listaTemporal.push({id: documento.id, ...documento.data()});
    //             })
    //             // console.log('Siguiente - Primer registro mostrado: ', snap.docs[0].data())
    //             // console.log('Siguiente - Ultimo registro mostrado: ', snap.docs[snap.docs.length-1].data());
    //             this.setState({
    //                 listaProductos: listaTemporal, 
    //                 primerProductoVisible:snap.docs[0], 
    //                 ultimoProductoVisible:snap.docs[snap.docs.length-1],
    //                 totalPrecioCompra: totalPrecioCompraTemp,
    //                 totalPrecioVenta: totalPrecioVentaTemp
    //             });
    //         }
           
            
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    // anterior = () => {
    //     console.log('Anterior', this.state.primerProductoVisible.data())
    //     let listaTemporal = [];
    //     let totalPrecioCompraTemp = 0;
    //     let totalPrecioVentaTemp = 0;
    //     db.collection('productos')
    //     .orderBy('creado')
    //     .endBefore(this.state.primerProductoVisible)
    //     .limitToLast(3)
    //     .get()
    //     .then((snap) => {
    //         console.log('snap.docs[0]', snap.docs[0])
    //         if(snap.docs[0]) {
    //             snap.forEach((documento) => {
    //                 totalPrecioCompraTemp = totalPrecioCompraTemp + parseInt(documento.data().precioCompra);
    //                 totalPrecioVentaTemp = totalPrecioVentaTemp + parseInt(documento.data().precioVenta)
    //                 listaTemporal.push({id: documento.id, ...documento.data()});
    //             })
    //             // console.log('Anterior - Primer registro mostrado: ', snap.docs[0].data())
    //             // console.log('Anterior - Ultimo registro mostrado: ', snap.docs[snap.docs.length-1].data());
    //             this.setState({
    //                 listaProductos: listaTemporal, 
    //                 primerProductoVisible:snap.docs[0], 
    //                 ultimoProductoVisible:snap.docs[snap.docs.length-1],
    //                 totalPrecioCompra: totalPrecioCompraTemp,
    //                 totalPrecioVenta: totalPrecioVentaTemp
    //             });
    //         }
            
            
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }
    obtenerProductos = () => {
        let listaTemporal = [];
        let totalPrecioCompraTemp = 0;
        let totalPrecioVentaTemp = 0;
        // let ref =  db.collection('productos').where("producto", "==", "Producto 3").orderBy('creado').limit(3);
        secondaryDb.collection('productos').orderBy('creado').limit(3).get()
        .then((snap) => {
            snap.forEach((documento) => {
                totalPrecioCompraTemp = totalPrecioCompraTemp + parseInt(documento.data().precioCompra);
                totalPrecioVentaTemp = totalPrecioVentaTemp + parseInt(documento.data().precioVenta)
                // console.log(documento.data().precioCompra)
                // console.log(documento.data())
                listaTemporal.push({id: documento.id, ...documento.data()});
            })
            // console.log('Primer registro mostrado: ', snap.docs[0].data())
            // console.log('Ultimo registro mostrado: ', snap.docs[snap.docs.length-1].data());
            this.setState({
                listaProductos: listaTemporal, 
                primerProductoVisible:snap.docs[0], 
                ultimoProductoVisible:snap.docs[snap.docs.length-1],
                totalPrecioCompra: totalPrecioCompraTemp,
                totalPrecioVenta: totalPrecioVentaTemp

            });
        })
        .catch((error) => {
            console.log(error)
        })
    }

    buscarProducto = () => {
        // let listaTemporal = [];
        // let ref =  db.collection('productos').where("producto", "==", `${this.state.buscador}`).orderBy('creado').limit(3);
        // ref.get()
        // .then((snap) => {
        //     snap.forEach((documento) => {
        //         // console.log(documento.id)
        //         // console.log(documento.data())
        //         listaTemporal.push({id: documento.id, ...documento.data()});
        //     })
        //     // console.log('Primer registro mostrado: ', snap.docs[0].data())
        //     // console.log('Ultimo registro mostrado: ', snap.docs[snap.docs.length-1].data());
        //     this.setState({listaProductos: listaTemporal, primerProductoVisible:snap.docs[0], ultimoProductoVisible:snap.docs[snap.docs.length-1] });
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
    }

    borrarProducto = (productoId) => {
        // db.collection('productos').doc(`${productoId}`).delete()
        // .then(() => {
        //     this.obtenerProductos()
        // })
        // .catch((error) => {
        //     console.error("Error removing document: ", error);
        // });

    }

    confirmarAccion = (productoId) => {
        confirmAlert({
          title: 'Accion borrar',
          message: 'Esta seguro?.',
          buttons: [
            {
              label: 'Si',
              onClick: () => this.borrarProducto(productoId)
            },
            {
              label: 'No',
            //   onClick: () => alert('Click No')
            }
          ]
        });
      };

    renderListaProductos = () => {
        return this.state.listaProductos.map((documento) => {
            return (
                // key es un identificador unico
                <tr key={documento.id}> 
                    <td>{documento.producto}</td>
                    <td style={{textAlign:"center"}}>{documento.precioCompra}</td>
                    <td style={{textAlign:"center"}}>{documento.precioVenta}</td>
                    <td style={{textAlign:"center"}}>
                        <Link to={`/productos/editar/${documento.id}`}><VscEdit/></Link>  {'  '}
                        <VscTrash onClick={() => this.confirmarAccion(documento.id)}/>
                    </td>
                    {/* <td><Link to={`/productos/editar/${documento.id}`}>Editar</Link> | <a href='#' onClick={() => this.confirmarAccion(documento.id)}>Borrar</a></td> */}
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
               <br/>
               <Row>
                   <Col>
                        <Button variant="primary" onClick={this.creaNuevoProducto} >Agregar Producto</Button> {' '}
                        <Button variant="danger" onClick={()=> {console.log('ProductoList state: ', this.state)}} >Ver state</Button>
                   </Col>
               </Row>
               <br/>
               <Row>
                   <Col md={4}>
                        <Form>
                                <Form.Group>
                                    <Form.Control type="text" name="buscador" value={this.state.buscador} onChange={this.setInputs} placeholder="Nombre del producto"/>
                                </Form.Group>
                        </Form>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip id="button-tooltip">Mensaje personalizado</Tooltip>}
                        >   
                        <div>
                         <Button variant="primary" onClick={this.buscarProducto} >Buscar</Button>
                        </div>
                        </OverlayTrigger>
                       
                         
                   </Col>
               </Row>
               <br/>
               <Row>
                   <Col>
                        <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {/* <th>#</th> */}
                                            <th>Nombre</th>
                                            <th style={{textAlign:"center"}}>Precio Compra</th>
                                            <th style={{textAlign:"center"}}>Precio Venta</th>
                                            <th style={{textAlign:"center"}}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filasGeneradasdeLaTabla}
                                        <tr>
                                            <td>TOTALES:</td>
                                            <td style={{textAlign:"center"}}>{this.state.totalPrecioCompra}</td>
                                            <td style={{textAlign:"center"}}>{this.state.totalPrecioVenta}</td>
                                        </tr>
                                    </tbody>
                        </Table>
                    </Col>
               </Row>
               {/* <Row>
                   <Col>
                        <Button variant="info" onClick={this.anterior}>Anterior</Button> {' '}
                       {this.state.ultimoProductoVisible != undefined?<Button variant="info" onClick={this.siguiente} >Siguiente</Button>: null} 
                   </Col>
               </Row> */}
               
            </div>

        )
                
            
        
    }
}


export default withRouter(ProductoList);