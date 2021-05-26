import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { isLogout } from './common.js';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';


export default class EditUser extends Component {

  constructor(props) {
    super(props)

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id:'',
      name: '',
      phone: '',
      date_of_birth: '',
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
           id: res.data.user.id,
           name: res.data.user.name,
           phone: res.data.user.phone,
           date_of_birth: res.data.user.date_of_birth,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({name: e.target.value})
  }

  onChangePhone(e) {
    this.setState({phone: e.target.value})
  }

  onChangeDateOfBirth(e) {
    this.setState({date_of_birth: e.target.value})
  }
  
  onSubmit(e) {
    e.preventDefault()

    const userObject = {
      id:  this.state.id,
      name: this.state.name,
      phone: this.state.phone,
      date_of_birth: this.state.date_of_birth,
    };

    let config = {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    }

    axios.put('http://localhost:8000/api/user/', userObject, config)
      .then((res) => {
        Swal.fire(
          'Bom trabalho!',
          'usuario atualizado',
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
      <Form onSubmit={this.onSubmit}>

        <Form.Group controlId="Name">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeName} />
        </Form.Group>

        <Form.Group controlId="Phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" value={this.state.phone} onChange={this.onChangePhone} />
        </Form.Group>

        <Form.Group controlId="DateOfBirth">
          <Form.Label>Fecha do nacimento</Form.Label>
          <Form.Control type="date" value={this.state.date_of_birth} onChange={this.onChangeDateOfBirth} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Atualizar usuario
        </Button>
      </Form>
    </div>);
  }
}