import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Logout (props) {
  return (
    <Fragment>
      <NavLink onClick={props.logout} href='/'>
        Logout
      </NavLink>
    </Fragment>
  );
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}
 
export default connect(null, { logout })(Logout);