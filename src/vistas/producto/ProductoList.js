import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';

export default class ProductoList extends Component {
    render() {
        return (
            <div>
               <Row>
                   <Col>Lista de Productos</Col>
               </Row>
               <Row>
                   <Col>
                        <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Fecha de Carga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Bananas</td>
                                            <td>De oro</td>
                                            <td>19/02/2020</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Bananas</td>
                                            <td>De oro</td>
                                            <td>19/02/2020</td>
                                        </tr>
                                    </tbody>
                                </Table>
                        </Col>
               </Row>
               <Row>
                   <Col>
                    <Button variant="primary">Agregar Producto</Button>
                   </Col>
               </Row>
            </div>

        )
                
            
        
    }
}
