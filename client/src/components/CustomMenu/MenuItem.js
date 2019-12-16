import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MenuItem extends Component {
  render() {
    const { item, onDelete, isEditable } = this.props;
    const { position, props, icon, text } = item;

    return (
      <div className={`contact-option d-flex mb-2 position-relative position-${position}`}>
        {isEditable && 
          <FontAwesomeIcon
            className='position-absolute contact-option-btn'
            icon={['fa', 'minus-circle']}
            style={{color: 'red', top: '5px', right: '0px'}}
            onClick={() => onDelete(item)}
          />
        }
        <div className='w-30'><FontAwesomeIcon {...props} icon={icon}/></div>
        <span>{text}</span>
      </div>
    );
  }
}