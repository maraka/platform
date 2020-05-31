import React, { Component } from 'react';
import {
  Card,
} from 'reactstrap';
import FabIcon from './Fab'

class Dashboard extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
            <Card>
              Aca van los cursos
              {/* Inserte aqui los cards con los cursos */}
              <FabIcon/>
            </Card>

      </div>
    );
  }
}

export default Dashboard;
