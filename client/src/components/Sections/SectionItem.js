import React, { Component, Fragment } from 'react';
import { renameSectionText, addSectionItem, removeSectionItem } from '../../actions/shared';
import { connect } from 'react-redux';

class SectionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      text: props.text,
      newText: props.text
    }

    this.ref = React.createRef();
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // Toggles editing state of section item text when
  // user focus' and blur's it. However, when the
  // user changes the item text of the section it will
  // also update the item text of the section in state.
  toggleEdit() {
    const { newText, text, isEditing } = this.state;
    const { renameSectionText, sectionIndex, index } = this.props;

    if (isEditing && newText && (newText !== text)) {
      this.setState(() => ({
        isEditing: false,
        text: newText
      }));

      renameSectionText('list', { index: sectionIndex, data: { index, value: newText } });
    } else {
      this.setState(({ isEditing }) => ({
        isEditing: !isEditing,
        newText: text
      }), () => {
        const isEditing = this.state.isEditing;
  
        if (isEditing) {
          const current = this.ref.current;

          current.children[0].focus();
        }
      });
    }
  }

  // Handles textarea value change
  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  // this method will check for the user
  // pressing the enter or backspae key to
  // create or delete an item moving the cursor
  // to appropriate position
  handleKeyPress(e) {
    const { addSectionItem, removeSectionItem, sectionIndex, index } = this.props;

    switch(e.key) {
      case 'Enter':
        const nextSibling = this.ref.current.nextSibling;
        
        if (nextSibling) {
          nextSibling.children[0].click();
        } else {
          addSectionItem({ index: sectionIndex, itemIndex: index + 1 }, () => {
            this.ref.current.nextSibling.children[0].click();
          });
        }
        break;
      case 'Backspace':
        const previousSibling = this.ref.current.previousSibling;

        if (!this.state.newText && previousSibling) {
          removeSectionItem({ index: sectionIndex, itemIndex: index }, () => {
            previousSibling.children[0].click();
          });
        }
        break;
      default:
        break;
    }
  }

  // This method renders a fragment that
  // allows for editable naming.
  EditableText = () => {
    const { text, newText, isEditing } = this.state;

    return (
      <Fragment>
        {isEditing
          ? <input
              className='outline-none w-fill border border-0'
              value={newText}
              name='newText'
              onChange={this.handleChange}
              onBlur={this.toggleEdit}
              onKeyUp={this.handleKeyPress}
            ></input>
          : <div className='w-fill h-fill'>{text}</div>
        }
      </Fragment>
    );
  }

  render() {
    const { text } = this.state;
    const { isEditable } = this.props;

    return (
      <li ref={this.ref} onClick={this.toggleEdit}>
        {isEditable
          ? this.EditableText()
          : <span>{text}</span>
        }
      </li>
    );
  }
}

export default connect(null, {
  renameSectionText,
  addSectionItem,
  removeSectionItem
})(SectionItem);