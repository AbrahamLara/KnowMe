import React, { Component, Fragment } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addContactOption, deleteContactOption } from '../../actions/shared';
import MenuItem from './MenuItem';

class EditableMenu extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    listKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired,
    isEditable: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      list: [],
      items: []
    };

    this.toggle = this.toggle.bind(this);
    this.handleOptionDelete = this.handleOptionDelete.bind(this);
  }

  // Once the component mounts we map through the user's
  // contact options and map their existing items to their
  // list as we also remove that item in the list dropdown
  // to prevent them from adding it again
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let list = {...this.props.list};
  
      const items = Object.values(this.props.items).map(item => {
        const temp = list[item.type];
        const { [temp.type]: value, ...rest } = list;
        
        list = {...rest};
  
        return { ...temp, ...item };
      });
  
      this.setState({
        list: Object.values(list),
        items
      });
    }
  }

  // Toggles the dropdown menu
  toggle() {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  }

  // Once the user clicks the delete button we remove
  // the option from the items array and add it to the
  // list that appears in the dropdown
  handleOptionDelete(option) {
    this.props.deleteContactOption(option.type);
  }

  // Once the user clicks an option they want to add we add it
  // to the items list and remove it from the list dropdown
  handleItemClick(obj) {
    const { icon, position, ...option } = obj;
    // this.setState(({items, list}) => ({
    //   items: items.concat(obj),
    //   list: list.filter(item => item.type !== obj.type)
    // }));
    this.props.addContactOption(option);
  }

  render() {
    const { isOpen, items, list } = this.state;
    const { name, isEditable } = this.props;

    return (
      <Fragment>
        { isEditable &&
          <Dropdown isOpen={isOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {name}
            </DropdownToggle>
            {list.length !== 0 &&
              <DropdownMenu>
                {list.map(item => (
                  <DropdownItem
                    key={item.type}
                    onClick={() => this.handleItemClick(item)}
                  >{item.type}</DropdownItem>
                ))}
              </DropdownMenu>
            }
          </Dropdown>
        }
        <div className='d-flex flex-direction-column mt-2'>
          {items.map(item => (
            <MenuItem
              key={item.type}
              item={item}
              isEditable={isEditable}
              onDelete={this.handleOptionDelete}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default connect(null, {
  addContactOption,
  deleteContactOption
})(EditableMenu);