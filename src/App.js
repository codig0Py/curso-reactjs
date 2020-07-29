import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ProductoList from './vistas/producto/ProductoList';
import ProductoForm from './vistas/producto/ProductoForm';
// import './App.css';

class App extends Component {
 render() {
   return(
      <Container>
          {/* <ProductoList/> */}
          <ProductoForm />
      </Container>
   )
 }
}

export default App;
