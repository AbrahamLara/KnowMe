import React, { Component, Fragment } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

export default class EditableMenu extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    listKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
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

  componentDidMount() {
    let list = {...this.props.list};

    const items = this.props.items.map(item => {
      const temp = list[item.type];
      const { [temp.type]: value, ...rest } = list;
      
      list = {...rest};

      return {
        ...temp,
        ...item
      }
    });

    this.setState({
      list: Object.values(list),
      items
    });
  }

  // Toggles the dropdown menu
  toggle() {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  }

  // This method is to handle the click of the delete button
  // for an option
  handleOptionDelete(option) {
    this.setState(({items, list}) => ({
      items: items.filter(contact => contact.type !== option.type),
      list: list.concat(option)
    }));
  }

  handleItemClick(obj) {
    this.setState(({items, list}) => ({
      items: items.concat(obj),
      list: list.filter(item => item.type !== obj.type)
    }));
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
        <div className='d-flex flex-direction-column'>
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