import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';


//This provider passes a value object with
//value.uid (hash id for user in auth firebase)
//value.data (currentUser object from firebase)
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        currentUser: null,
      };
    }
  
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        uid => {
        if(uid){
           this.setState({currentUser : this.props.firebase.auth.currentUser})
        } else{
          this.setState({ currentUser: null })
        };
      });
    }
  
    componentWillUnmount() {
      this.listener();
    }
    
    render() {
      return (
        <AuthUserContext.Provider value={this.state.currentUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;