import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button} from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col md={12}>
                        <Jumbotron>
                            <h1>Hello, world!</h1>
                            <p>
                                This is a simple hero unit, a simple jumbotron-style component for calling
                                extra attention to featured content or information.
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;
