import React, { Component } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import BaseSection from './BaseSection';
import SectionText from './SectionText';
import SectionList from './SectionList';

class Sections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  // Toggles dropdown
  toggle() {
    this.setState(({isOpen}) => ({
      isOpen: !isOpen
    }));
  }

  // Deletes section from the given
  // index
  handleDelete(index) {
    console.log(index)
  }

  render() {
    const { isOpen } = this.state;
    const { profile: { sections }, isEditable } = this.props;

    return (
      <div className='mt-2'>
        <ButtonDropdown isOpen={isOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            New Section
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Text</DropdownItem>
            <DropdownItem>List</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <div>
          {sections.map((section, i) => {
            let Section = null;

            if (section.type === 'text') {
              Section = <SectionText isEditable={isEditable} text={section.value} />;
            } else if (section.type === 'list') {
              Section = <SectionList isEditable={isEditable} list={section.list} />;
            }

            return (
              <BaseSection
                key={i}
                index={i}
                isEditable={isEditable}
                name={section.name}
                onDelete={this.handleDelete}
              >
                {Section}
              </BaseSection>
            )
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return {
    profile
  };
}

export default connect(mapStateToProps)(Sections);