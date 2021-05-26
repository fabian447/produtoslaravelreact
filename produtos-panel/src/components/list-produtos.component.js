import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ProdutoTableRow from './ProdutoTableRow';
import { isLogout } from './common.js';
import { Redirect } from 'react-router-dom';


export default class ProdutoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      produtos: [],
      redirect: false
    };
  }
  
  componentDidMount() {
    (async () => {
      try {
          this.setState({redirect: await isLogout()});
      } catch (e) {
          //...handle the error...
      }
    })();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    }

    axios.get('http://localhost:8000/api/produtos/', config)
      .then(res => {
        this.setState({
          produtos: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.produtos.map((res, i) => {
      return <ProdutoTableRow obj={res} key={i} />;
    });
  }


  render() {
    
    if (this.state.redirect) {
      return <Redirect to='/'/>;
    }

    return (<div className="table-wrapper">

      <div className="table-container">
        <Table striped bordered hover> 
          <thead>
            <tr>
              <th>Numero Serial</th>
              <th>Nome</th>
              <th>Altura</th>
              <th>Largura</th>
              <th>Anchura</th>
              <th>Peso</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {this.DataTable()}
          </tbody>
        </Table>
      </div>
    </div>);
  }
}