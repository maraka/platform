import React from 'react';
import ReactDOM from 'react-dom';
import UploadLead from './UploadLead';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UploadLead />, div);
  ReactDOM.unmountComponentAtNode(div);
});
