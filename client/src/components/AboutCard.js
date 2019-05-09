import React from'react';
import PropTypes from 'prop-types';
import { combineClassNames } from '../utils/helpers';
import '../css/AboutCard.css';

export default function AboutCard ({ className, headerTxt, children }) {
  return (
    <div className={combineClassNames('AboutCard', className)}>
      <header className='ac-header'>{headerTxt}</header>
      <div>{children}</div>
    </div>
  );
}

AboutCard.propTypes = {
  headerTxt: PropTypes.string
}