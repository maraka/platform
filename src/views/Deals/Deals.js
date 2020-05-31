import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'
import ChartWidget from './ChartWidget'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

//taken from the code in marketplaceTable.js
import NumberFormat from 'react-number-format';

import { withFirebase } from '../../components/firebase'
import InfiniteScroll from 'react-infinite-scroller';

//constants to show some fancy charts TODO: make this connect with real data base
const makeSparkLineData = (dataSetNo, variant) => {
  // sparkline charts
  const sparkLineChartData = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'New Clients',
    },
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Recurring Clients',
    },
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Capital Colocado',
    },
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Capital Castigado',
    }
  ];

  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: getStyle('--primary'),
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};



//this page uses code taken from the main MarketplaceTable TODO: extrat a reusable component to insert here
var listListener = [];

class Deals extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Row>
              <Col xs="12" md="6" xl="6">
                <Row>
                  <Col sm="6">
                    <ChartWidget name="Mi actividad" value="12,300" lineData={makeSparkLineData(0)} />
                  </Col>
                  <Col sm="6">
                    <ChartWidget name="Mi progreso" value="22,643" lineData={makeSparkLineData(1)} />
                  </Col>
                </Row>
              </Col>
              <Col xs="12" md="6" xl="6">
                <Row>
                  <Col sm="6">
                    <ChartWidget name="Mis ideas" value="78,623" lineData={makeSparkLineData(2)} />
                  </Col>
                  <Col sm="6">
                    <ChartWidget name="Mi aporte" value="9,123" lineData={makeSparkLineData(3)} />
                  </Col>
                </Row>
              </Col>
            </Row>

          </CardBody>
        </Card>

        <Card>
          Aca van mis cursos
          {/* Insert some other data here */}
        </Card>

      </div>
    );
  }
}

export default Deals;
