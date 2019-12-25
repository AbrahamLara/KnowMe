import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { renameSection } from '../../actions/shared';

class BaseSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      name: props.name,
      newName: props.name
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.ref = React.createRef();
  }

  // Handles input value change
  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  // Toggles editing state of section name when
  // user focus' and blur's it. However, when the
  // user changes the name of the section it will
  // also update the name of the section in state.
  toggleEdit() {
    const { newName, name, isEditing } = this.state;
    const index = this.props.index;

    if (isEditing && newName && (newName !== name)) {
      this.setState(() => ({
        isEditing: false,
        name: newName
      }));

      this.props.renameSection(index, newName);
    } else {
      this.setState(({ isEditing }) => ({
        isEditing: !isEditing,
        newName: name
      }), () => {
        const isEditing = this.state.isEditing;
  
        if (isEditing) {
          this.ref.current.focus();
        }
      });
    }
  }

  // This method renders a fragment that
  // allows for editable naming.
  EditableHeader = () => {
    const { isEditing, newName, name } = this.state;
    const { onDelete, index } = this.props;
    
    return (
      <Fragment>
        {isEditing
          ? <input
              ref={this.ref}
              className='p-0 m-0 border border-0 h4 outline-none w-fill'
              name='newName'
              value={newName}
              onBlur={this.toggleEdit}
              onChange={this.handleChange}
            />
          : <div className='mr-2 d-flex align-items-center'>
              <h4 className='mb-0'
                onClick={this.toggleEdit}
              ><strong>{name}:</strong></h4>
              <FontAwesomeIcon
                className='cursor'
                onClick={() => {onDelete(index)}}
                icon={['fa', 'trash-alt']}
                style={{ width: '15px'}}
                color='red'
              />
            </div>
        }
      </Fragment>
    )
  }

  render() {
    const { children, isEditable } = this.props
    const { name } = this.state;

    return (
      <div className='mt-2 mr-2'>
        {isEditable
          ? this.EditableHeader()
          : <h4 className='mb-0'>
              <strong>{name}:</strong>
            </h4>
        }
        {children}
      </div>
    );
  }
}

export default connect(null, {
  renameSection
})(BaseSection);