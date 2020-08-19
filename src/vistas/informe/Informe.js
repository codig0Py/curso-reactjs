import React from "react";
import { Row, Col , Jumbotron, Button} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


class Informe extends React.Component {
    render(){
        return(
            <Row>
            <Col md={12}>
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
                <table id="table-to-xls">
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Age</th>
                    </tr>
                    <tr>
                        <td>Jill</td>
                        <td>Smith</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td>
                        <td>94</td>
                    </tr>
                </table>
 
            </div>
            </Col>
        </Row>
        )
    }
}

export default Informe;