import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ProductoList from './vistas/producto/ProductoList';
// import './App.css';

class App extends Component {
 render() {
   return(
      <Container>
          <ProductoList/>
      </Container>
   )
 }
}

export default App;
