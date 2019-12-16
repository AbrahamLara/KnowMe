import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../css/MenuItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'reactstrap';

export default class MenuItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    isEditable: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      text: props.item.text,
      value: props.item.value,
      inputValue: props.item.value
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // This method toggles option to edit mode
  // everytime the edit icon click. If the input's
  // value is empty or the same as its previous value
  // then we only toggle edit. If it's a different value
  // than before then we update it.
  toggleEdit() {
    const { inputValue, value } = this.state;
    
    if (inputValue && (inputValue !== value)) {
      this.setState(({editing}) => ({
        editing: !editing,
        value: inputValue
      }), () => {
        // Update value in backend
      });
    } else {
      this.setState(({editing}) => ({
        editing: !editing
      }));
    }
  }

  // Once the user makes a change to the input
  // we update the text value or link's value
  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { value, inputValue, text, editing }  = this.state;
    const { item, onDelete, isEditable } = this.props;
    const { position, props, icon } = item;
    const readOnlyText = text
      ? <a
          style={{color: 'black'}}
          target='_blank'
          rel='noopener noreferrer'
          href={value}
        >{text}</a>
      : <span>{value}</span>;

    return (
      <div className={`contact-option d-flex mb-2 justify-content-between position-${position}`}>
        <div className='d-flex align-items-center'>
          <div className='w-30'><FontAwesomeIcon {...props} icon={icon}/></div>
          {editing
            ? <Input
                className='menu-item-input'
                placeholder='type something...'
                name='inputValue'
                onChange={this.handleChange}
                value={inputValue}
              />
            : readOnlyText
          }
        </div>
        {isEditable && 
          <div>
            <FontAwesomeIcon
              className='contact-option-btn mr-2'
              icon={['fa', 'edit']}
              onClick={this.toggleEdit}
            />
            <FontAwesomeIcon
              className='contact-option-btn'
              icon={['fa', 'minus-circle']}
              onClick={() => onDelete(item)}
              style={{color: 'red'}}
            />
          </div>
        }
      </div>
    );
  }
}