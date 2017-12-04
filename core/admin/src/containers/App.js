import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link } from 'react-router'
import Navbar from '../components/Navbar'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   currentUser: state.session.currentUser
// })

// App = connect(mapStateToProps)(App)

export default App