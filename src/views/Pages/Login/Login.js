import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { withFirebase } from '../../../components/firebase';

const INITIAL_STATE = {
  email: '',
  password: '',
  button: '',
  error: null,
  recovervisible: false,
};

class LoginBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };

    this.onDismiss = this.onDismiss.bind(this);

  }

  onDismiss() {
    this.setState({ recovervisible: false });
  }

  onSubmit = event => {
    const { email, password, button } = this.state;

    if (button === "login") {
      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push('/');
        })
        .catch(error => {
          this.setState({ error });
          alert("Error en doSignInWithEmailAndPassword firebase: ", error);
        });
    } else if (button === "forgot") {
      this.props.firebase
        .doPasswordReset(email)
        .then(() => {
          this.setState({
            password: '',
            error: null,
            recovervisible: true
          });
        })
        .catch(error => {
          this.setState({ error });
          alert("Error en doPasswordReset firebase: ", error);
        });
    }

    //event.preventDefault();
  }

  onClick = event => {
    //we call onsubmit on the callback of setState as the mutation is not sync
    this.setState({ [event.target.name]: event.target.value },
      () => {
        this.onSubmit()
      });

  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="email" autoComplete="email" onChange={this.onChange} name="email" value={email} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" onChange={this.onChange} name="password" value={password} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button disabled={isInvalid} color="primary" className="px-4" name="button" value="login" onClick={this.onClick} >Login</Button>
                          {error && <Alert>{error.message}</Alert>}
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" name="button" value="forgot" onClick={this.onClick}>Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <Alert color="info" isOpen={this.state.recovervisible} toggle={this.onDismiss}>
                    Check your email to recover your password!
                  </Alert>
                </Card>
                <Card className="text-white bg-primary p-4 card" >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Si aun no tienes una cuenta, registrate acá.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Registrarme</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const Login = withFirebase(LoginBase);


export default Login;
