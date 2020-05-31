import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { withFirebase } from '../../../components/firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  oName: '',
  oAvatar: '',

  orgDataList: [],

  error: null,
};


//This class is later promoted to Register trough a Firebase transformation
class RegisterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    var dataQuery = [];
    //retrieve all the organizations registerd so far
    this.props.firebase.cOrg()
      .get()
      .then((querySnapshot) => {
        querySnapshot
          .forEach((doc) => {
            dataQuery.push(doc)
            this.setState({ orgDataList: dataQuery });

            console.log(doc.id, " => ", doc.data());
          });

      });

  }

  onSubmit = event => {
    const { name, email, passwordOne, oName, oAvatar, oid } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        //update displayName of user in auth firebase
        this.props.firebase.auth.currentUser
          .updateProfile({
            displayName: name
          }).catch((error) => {
            // An error happened.
            alert("Failed updating displayName in auth firebase as: ", error)
          });

        // Create a user in your Firestore DB
        //TODO: rollback user creation??
        this.props.firebase
          .dUser(authUser.user.uid)
          .set({
            name,
            email,
            oid,
            oName,
            oAvatar,
          }).catch((error) => {
            // An error happened.
            alert("Failed updating user in Firestore db firebase as: ", error)
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/');
      })

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeSelectOrg = event => {
    const orgDataList = this.state.orgDataList;

    //pure magic
    const orgData = orgDataList.filter((item) => { return (item.id === event.target.value); })[0].data()

    this.setState({
      oid: event.target.value,
      oName: orgData.oName,
      oAvatar: orgData.oAvatar,
    });
  };


  render() {
    const {
      name,
      email,
      passwordOne,
      passwordTwo,
      oid,
      oAvatar,
      orgDataList,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      name === '';

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Name" autoComplete="name" onChange={this.onChange} name="name" value={name} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" onChange={this.onChange} name="email" value={email} />
                    </InputGroup>


                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" onChange={this.onChange} name="passwordOne" value={passwordOne} />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" onChange={this.onChange} name="passwordTwo" value={passwordTwo} />
                    </InputGroup>
                    <Button disabled={isInvalid} color="success" block>Create Account</Button>
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

const Register = withFirebase(RegisterBase);


export default Register;
