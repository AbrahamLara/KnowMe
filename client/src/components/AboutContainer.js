import React from 'react';
import AboutCard from './AboutCard';
import '../css/AboutContainer.css'
import classnames from 'classnames';

export default function AboutContainer ({ className }) {
  return (
    <div className={classnames('AboutContainer', className)}>
      <AboutCard headerTxt='Share'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </AboutCard>
      <AboutCard headerTxt='Discover'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </AboutCard>
      <AboutCard headerTxt='Engage'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </AboutCard>
    </div>
  );
}