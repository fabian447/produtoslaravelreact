import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { isLogout } from './common.js';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';


export default class EditExpense extends Component {

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
    console.log(this.props);
    axios.get('http://localhost:8000/api/produtos/' + this.props.match.params.id, config)
      .then(res => {
        this.setState({
          serialNumber: res.data.serial_number,
          name: res.data.name,
          heigth: res.data.heigth,
          length: res.data.length,
          width: res.data.width,
          weigth: res.data.weigth,
        
        });
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

    const produtoObject = {
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

    axios.put('http://localhost:8000/api/produtos/' + this.props.match.params.id, produtoObject, config)
      .then((res) => {
        Swal.fire(
          'Bom trabalho!',
          'produto atualizado',
          'success'
          )
      }).catch((error) => {
        Swal.fire(
          'erro',
          'por favor verifique as informações enviadas',
          'error'
          )
      })

    this.props.history.push('/list-produto')
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
          <Form.Control type="text" value={this.state.serialNumber} onChange={this.onChangeSerialNumber} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeProdutoName} />
        </Form.Group>

        <Form.Group controlId="Heigth">
          <Form.Label>Altura</Form.Label>
          <Form.Control type="text" value={this.state.heigth} onChange={this.onChangeProdutoHeigth} />
        </Form.Group>

        <Form.Group controlId="Length">
          <Form.Label>Largura</Form.Label>
          <Form.Control type="text" value={this.state.length} onChange={this.onChangeProdutoLength} />
        </Form.Group>

        <Form.Group controlId="Width">
          <Form.Label>Anchura</Form.Label>
          <Form.Control type="text" value={this.state.width} onChange={this.onChangeProdutoWidth} />
        </Form.Group>

        <Form.Group controlId="Weigth">
            <Form.Label>Peso</Form.Label>
            <Form.Control type="text" value={this.state.weigth} onChange={this.onChangeProdutoWeigth}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Atualizar produto
        </Button>
      </Form>
      </div>
    </div>);
  }
}