import React, { Component, Fragment } from 'react';
import ExpandCollapse from 'react-expand-collapse';
import { connect } from 'react-redux';
import { renameSectionText } from '../../actions/shared';

class SectionText extends Component {
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
  }

  // Toggles editing state of section text when
  // user focus' and blur's it. However, when the
  // user changes the text of the section it will
  // also update the text of the section in state.
  toggleEdit() {
    const { newText, text, isEditing } = this.state;
    const { sectionIndex, renameSectionText } = this.props;

    if (isEditing && newText && (newText !== text)) {
      this.setState(() => ({
        isEditing: false,
        text: newText
      }));

      renameSectionText('text', { index: sectionIndex, data: { value: newText } });
    } else {
      this.setState(({ isEditing }) => ({
        isEditing: !isEditing,
        newText: text
      }), () => {
        const isEditing = this.state.isEditing;
  
        if (isEditing) {
          const current = this.ref.current;

          current.focus();
          current.setSelectionRange(current.value.length, current.value.length);
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

  // This method renders a fragment that
  // allows for editable naming.
  EditableText = () => {
    const { text, newText, isEditing } = this.state;

    return (
      <Fragment>
        {isEditing
          ? <textarea
              className='outline-none w-fill h-fit h-160'
              ref={this.ref}
              value={newText}
              name='newText'
              onChange={this.handleChange}
              onBlur={this.toggleEdit}
            ></textarea>
          : <ExpandCollapse
              className='pl-0'
              previewHeight='160px'
              id='userDescription'
            >
              <div onClick={this.toggleEdit}>{text}</div>
            </ExpandCollapse>
        }
      </Fragment>
    );
  }

  render() {
    const { text } = this.state;
    const { isEditable } = this.props;

    return (
      <Fragment>
        {isEditable
          ? this.EditableText()
          : <ExpandCollapse
              className='pl-0'
              previewHeight='160px'
              id='userDescription'
            >
              {text}
            </ExpandCollapse>
        }
      </Fragment>
    );
  }
}

export default connect(null, {
  renameSectionText
})(SectionText);