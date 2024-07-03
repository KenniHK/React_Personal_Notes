import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { LocaleConsumer } from '../context/LocaleContext';
 
function Navigation({logout, name}) {
  return (
    <LocaleConsumer>
      {
         ({ locale, toggleLocale}) => {
          return (
    <nav className="navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><button onClick={toggleLocale} className='buttonId'>{locale === 'id' ? 'en' : 'id'}</button></li>
        <li><Link to="/notes/new">Add</Link></li>
        <li><button onClick={logout} className='buttonLogout'>{name} Logout <FiLogOut /></button></li>
      </ul>
    </nav>
          )
        }
      }
        </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
 
Navigation.defaultProps = {
  name: 'User',
};
export default Navigation;