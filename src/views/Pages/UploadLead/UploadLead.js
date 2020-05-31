import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

import { withFirebase } from '../../../components/firebase';

const INITIAL_STATE = {
  name: '',
  location: '',
  size: '',
  email: '',
  phonenumber: '',

  error: null,
};

//This class is later promoted to Register trough a Firebase transformation
class UploadLeadBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }

  componentDidMount() {
    const currentUser = this.props.firebase.auth.currentUser;
    
    this.props.firebase.dUser(currentUser.uid).get()
      .then((user) => {
        this.setState({
          oid: user.data().oid,
          oName: user.data().oName,
          oAvatar: user.data().oAvatar
        })
      })
      .catch(e => { alert('error on uploadLead getting the user data. Error:  ', e) }
      )
  }

  onSubmit = event => {

    event.preventDefault();

    const { name,
      location,
      size,
      email,
      phonenumber
    } = this.state;

      var date = new Date()
      
    // Create a request in your Firebase realtime database
    //TODO: catch error
    this.props.firebase
      .cRequests()
      .add({
        name,
        location,
        size,
        email,
        phonenumber
      }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        window.location.href = "/"
      }
      )
      .catch(error => {
        this.setState({ error });
        alert("error en el upload, ", error)
      });


  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const {
      name,
      location,
      size,
      email,
      phonenumber,
      error,
    } = this.state;

    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="9" xl="6">
              <Card className="mx-auto">
                <CardBody className="p-4">
                  <Form onSubmit={this.onSubmit}>
                    <h1>Upload Lead</h1>
                    <p className="text-muted">Create the data for referral</p>

                    <TextField id="margin-normal" margin="normal"
                      label="Nombre de quien tiene la solicitud"
                      helperText="El nombre del lead no se revela en el marketplace"
                      value={name} name="name" onChange={this.onChange}
                    />
                    <br />

                    <TextField id="margin-normal" margin="normal"
                      label="Ciudad"
                      value={location} name="location" onChange={this.onChange}
                    />
                    <br />

                    <TextField id="margin-normal" margin="normal"
                      label="Email"
                      value={email} name="email" onChange={this.onChange}
                    />
                    <br />

                    <TextField id="margin-normal" margin="normal"
                      label="Telefono"
                      value={phonenumber} name="phonenumber" onChange={this.onChange}
                    />
                    <br />

                    <TextField id="margin-normal" margin="normal"
                      label="Observaciones"
                      value={size} name="size" onChange={this.onChange}
                    />
                    <br />

                    
                    <br />
                    <br />
                    <br />

                    <Button color="success" block>Enviar</Button>
                    {error && <p>{error.message}</p>}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const UploadLead = withFirebase(UploadLeadBase);


export default UploadLead;
