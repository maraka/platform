import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Deals';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Deals />, div);
  ReactDOM.unmountComponentAtNode(div);
});
