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
import { addSection, removeSection } from '../../actions/shared';

class Sections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // Toggles dropdown
  toggle() {
    this.setState(({isOpen}) => ({
      isOpen: !isOpen
    }));
  }

  // Creates a section
  handleClick(type) {
    this.props.addSection(type);
  }

  // Deletes section from the given
  // index
  handleDelete(index) {
    this.props.removeSection(index);
  }

  render() {
    const { isOpen } = this.state;
    const { profile: { sections }, isEditable } = this.props;

    return (
      <div className='mt-2'>
        {isEditable &&
          <ButtonDropdown isOpen={isOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              New Section
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.handleClick('text')}>Text</DropdownItem>
              <DropdownItem onClick={() => this.handleClick('list')}>List</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        }
        <div>
          {sections.map((section, i) => {
            let Section = null;

            if (section.type === 'text') {
              Section = <SectionText sectionIndex={i} isEditable={isEditable} text={section.value} />;
            } else if (section.type === 'list') {
              Section = <SectionList sectionIndex={i} isEditable={isEditable} list={section.list} />;
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

export default connect(mapStateToProps, {
  addSection,
  removeSection
})(Sections);