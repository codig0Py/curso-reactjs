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
    render(){
        return(
            <Row>
            <Col md={12}>
                <ExcelFile element={<Button variant="primary">Exportar a Excel</Button>} >
                    <ExcelSheet data={this.props.productos} name="Employees">
                        <ExcelColumn label="Name" value="name"/>
                        <ExcelColumn label="Wallet Money" value="amount"/>
                        <ExcelColumn label="Gender" value="sex"/>
                        <ExcelColumn label="Marital Status" value={(col) => col.is_married ? "Married" : "Single"}/>
                    </ExcelSheet>
                </ExcelFile>
            </Col>
        </Row>
        )
    }
}

export default ProductoInforme;