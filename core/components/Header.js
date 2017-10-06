import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';




class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      active: false
    };
    this.signOut = this.signOut.bind(this);
    this.dropDown = this.dropDown.bind(this);
  }

  componentDidMount() {
    this.setState({
      loggedIn: localStorage.getItem('cnd.token') ? true : false
    });
  }

  signOut() {
    this.setState({
      loggedIn: false
    });
    window.localStorage.removeItem('cnd.token');
    Router.push({pathname: '/'});
  }

  dropDown() {
    this.state.active ? this.setState({active: false}) : this.setState({active: true})
  }

  render() {
    const isActive = (val) => this.props.url.pathname === val ? 'is-active' : '';
    const toggleDropDown = this.state.active ? 'is-active' : null;
    return (
      <div className="Admin__Header">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item">            
                <img src="/static/styles/admin/exit.svg" />
              </a>
            </Link>
            <div className={`navbar-burger burger ${toggleDropDown}`} onClick={this.dropDown}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>



          <div className={`navbar-menu ${toggleDropDown}`}>
            <div className="navbar-start">
              <div className="navbar-item">
                <Link href="/admin"><a className={isActive('/admin')}>Site</a></Link>
              </div>
              <div className="navbar-item">
                <Link href="/admin/pages"><a className={isActive('/admin/pages')}>Pages</a></Link>
              </div>
              <div className="navbar-item">
                <Link href="/admin/reports"><a className={isActive('/admin/reports')}>Reports</a></Link>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Admin</a>
                <div className="navbar-dropdown is-boxed">
                  <div className="navbar-item"><a onClick={this.signOut}>Log Out</a></div>
                </div>
              </div>
            </div>
          </div>

        </nav>
      </div>
    );
  }
}
Header.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  })
};

export default Header;
