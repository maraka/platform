import React, { Component } from 'react';

import Avatar from 'react-avatar';
import { AuthUserContext } from '../../components/sessions';
import { withFirebase } from '../firebase';


class AvatarZoco extends Component{
  constructor(props) {
    super(props);

    this.state = { oid:null,oName:null,oAvatar:null };

  }

  //make available the auth currentUser info in this.context
  static contextType = AuthUserContext;

  componentDidMount() {
    
    this.props.firebase.dUser(this.context.uid).get()
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
  
  // magic to get a unique color from the user uid so it mantains still for all the lifecycle
  getHexColor = (uid) =>{

    var hexColor = "#" + parseInt(uid, 32).toString(16).substring(0, 6).padStart(6,"000000");
    
    return hexColor
  }

  getName = (authUser) => {
    
  return authUser.data.displayName;

  }

  render() {
    const uid = this.context.uid;
    const photoURL = this.context.photoURL;
    const displayName = this.context.displayName;
  
    return (
      <div>
        <Avatar src={this.state.oAvatar} size="40" round="40px"/>
        {photoURL ? 
          (<Avatar src={photoURL} size="40" round="40px"/>)
          :(<Avatar color = {this.getHexColor(uid)} name = {displayName ? displayName : "No Name"} size="40" round="40px"/>)
        }
        </div>
    );
  }
}


//const AvatarZoco = withAuthentication(AvatarZocoBase);
export default withFirebase(AvatarZoco);