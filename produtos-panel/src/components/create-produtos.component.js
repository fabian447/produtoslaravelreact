import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import ProdutosList from './list-produtos.component';
import Swal from 'sweetalert2';
import { isLogout } from './common.js';
import { Redirect } from 'react-router-dom';


export default class CreateProduto extends Component {

    constructor(props) {
    super(props)

    this.onChangeSerialNumber = this.onChangeSerialNumber.bind(this);
    this.onChangeProdutoName = this.onChangeProdutoName.bind(this);
    this.onChangeProdutoHeigth = this.onChangeProdutoHeigth.bind(this);
    this.onChangeProdutoLength = this.onChangeProdutoLength.bind(this);
    this.onChangeProdutoWidth = this.onChangeProdutoWidth.bind(this);
    this.onChangeProdutoWeigth = this.onChangeProdutoWeigth.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user_id: '',
      serialNumber: '',
      name: '',
      heigth: '',
      length: '',
      width: '',
      weigth: '',
      redirect: false
    }

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
    axios.get('http://localhost:8000/api/user/', config)
    .then(res => {
      this.setState({
          user_id: res.data.user.id,
      });
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }



  onChangeSerialNumber(e) {
    this.setState({serialNumber: e.target.value})
  }

  onChangeProdutoName(e) {
    this.setState({name: e.target.value})
  }

  onChangeProdutoHeigth(e) {
    this.setState({heigth: e.target.value})
  }
  
  onChangeProdutoLength(e) {
    this.setState({length: e.target.value})
  }

  onChangeProdutoWidth(e) {
    this.setState({width: e.target.value})
  }

  onChangeProdutoWeigth(e) {
    this.setState({weigth: e.target.value})
  }


  onSubmit(e) {
    e.preventDefault()
     const produto = {
      user_id: this.state.user_id,
      serial_number: this.state.serialNumber,
      name: this.state.name,
      heigth: this.state.heigth,
      length: this.state.length,
      width: this.state.width,
      weigth: this.state.weigth,
    };
    let config = {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    }
    axios.post('http://localhost:8000/api/produtos/', produto, config)
    .then((res) => {
      Swal.fire(
        'Bom trabalho!',
        'produto adicionado',
        'success'
        )
   
    }).catch((error) => {
      Swal.fire(
        'erro',
        'por favor verifique as informações enviadas',
        'error'
        )
    })
    

    this.setState({user_id: '', serialNumber: '', name: '', heigth: '', length: '', width: '', weigth: ''})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/'/>;
    }
    return (<div className="form-wrapper">
      <div className="form-container">
        <Form onSubmit={this.onSubmit}>
  

             <Form.Group controlId="SerialNumber">
                <Form.Label>Numero de serie</Form.Label>
                <Form.Control type="text" value={this.state.serialNumber} onChange={this.onChangeSerialNumber} required/>
             </Form.Group>
            
   

             <Form.Group controlId="Name">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" value={this.state.Name} onChange={this.onChangeProdutoName} required/>
             </Form.Group>

             <Form.Group controlId="Heigth">
                <Form.Label>Altura</Form.Label>
                <Form.Control type="text" value={this.state.heigth} onChange={this.onChangeProdutoHeigth} required/>
             </Form.Group>
  
            
             <Form.Group controlId="Length">
                <Form.Label>Largura</Form.Label>
                <Form.Control type="text" value={this.state.length} onChange={this.onChangeProdutoLength} required/>
             </Form.Group>
    
             <Form.Group controlId="Width">
                <Form.Label>Anchura</Form.Label>
                <Form.Control type="text" value={this.state.width} onChange={this.onChangeProdutoWidth} required/>
             </Form.Group>
            
        
            
            <Form.Group controlId="Weigth">
               <Form.Label>Peso</Form.Label>
               <Form.Control type="text" value={this.state.weigth} onChange={this.onChangeProdutoWeigth} required/>
            </Form.Group>
     
           
   
            

       
        <Button variant="primary" size="lg" block="block" type="submit">
          Adicionar Produto
        </Button>
      </Form>

      </div>


      <br></br>
      <br></br>

      <ProdutosList> </ProdutosList>
    </div>);
  }
}
