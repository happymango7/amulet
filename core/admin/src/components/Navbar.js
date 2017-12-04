import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import exitIcon from '../styles/exit.svg'

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Navbar">
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-burger burger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <Link to="/">
                  Dashboard
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/reports">
                  Reports
                </Link>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Admin</a>
                <div className="navbar-dropdown is-boxed">
                  <div className="navbar-item">
                    <a>Log Out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}


export default Navbar