import React from "react";
import { Row, Col , Jumbotron, Button} from 'react-bootstrap';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];


class ProductoInforme extends React.Component {
    verProps =()=> {
        console.log('ProductoInforme props: ', this.props)
    }
    render(){
        return(
            <Row>
            <Col md={12}>
                <ExcelFile element={<Button variant="primary" onClick={()=> this.verProps()}>Exportar a Excel</Button>} >
                    <ExcelSheet data={this.props.productos} name="Productos">
                        <ExcelColumn label="Producto" value="producto"/>
                        <ExcelColumn label="Precio Compra" value="precioCompra"/>
                        <ExcelColumn label="Precio Venta" value="precioVenta"/>
                        {/* <ExcelColumn label="Creado" value="creado"/> */}
                        
                    </ExcelSheet>
                </ExcelFile>
            </Col>
        </Row>
        )
    }
}

export default ProductoInforme;