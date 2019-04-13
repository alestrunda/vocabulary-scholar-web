import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const SettingsCheckbox = props => (
  <Checkbox
    style={{ width: 'auto' }}
    iconStyle={{ fill: '#fff' }}
    labelStyle={{ color: '#fff' }}
    className="mb10"
    {...props}
  />
);

export default SettingsCheckbox;
