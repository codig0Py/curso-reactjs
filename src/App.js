import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ProductoList from './vistas/producto/ProductoList';
import ProductoForm from './vistas/producto/ProductoForm';
import ProductoV2Ejemplo from './vistas/producto/ProductoV2Ejemplo';
import ProductoFormv2 from './vistas/producto/ProductoFormv2';
import Menu from './componentes/Menu';
import Home from './vistas/Home';
import MovimientoForm from './vistas/movimiento/MovimientoForm'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import './App.css';

class App extends Component {
 render() {
   return(
     <Router>
       <Menu/>
        <Container>
          <Switch>
             <Route exact path="/" component={Home}/>
             <Route exact path="/productos" component={ProductoList}/>
             <Route exact path="/productosv2" component={ProductoFormv2}/>
             <Route  path="/productos/editar/:id" component={ProductoForm} />
             <Route  path="/productos/nuevo" component={ProductoForm} />
             <Route  path="/movimientos" component={MovimientoForm} />

          </Switch>
        </Container>
     </Router>
   )
 }
}

export default App;
