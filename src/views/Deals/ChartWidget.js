import React, {Component} from 'react';

import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


const sparklineChartOpts = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          display: false,
        }],
      yAxes: [
        {
          display: false,
        }],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    legend: {
      display: false,
    },
  };

class ChartWidget extends Component {
    render() {
        return (
            <div className="callout callout-info">
                <small className="text-muted">{this.props.name}</small>
                <br />
                <strong className="h4">{this.props.value}</strong>
                <div className="chart-wrapper">
                    <Line data={this.props.lineData} options={sparklineChartOpts} width={100} height={30} />
                </div>
            </div>       
        );
    }
}

export default ChartWidget;


