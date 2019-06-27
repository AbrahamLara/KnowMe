import React from'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import '../css/AboutCard.css';

export default function AboutCard ({ className, headerTxt, children }) {
  return (
    <div className={classnames('AboutCard', className)}>
      <header className='ac-header'>{headerTxt}</header>
      <div>{children}</div>
    </div>
  );
}

AboutCard.propTypes = {
  headerTxt: PropTypes.string
}