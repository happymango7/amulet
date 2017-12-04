import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import { listSites } from '../actions/siteActions'

class Dashboard extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(listSites())
  }

  render() {
    const { sites, isLoading } = this.props

    if(isLoading) {
      return <div>Loading....</div>
    }

    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <div className="wrapper">
          <div className="columns is-multiline">
          {sites.map((site) => {
              return (
                <div className="column" key={site.id}>
                  <div className="block block--main">
                    <Link to={`/site/${site.id}`}>Edit</Link>
                    <h3>{site.title}</h3>
                    <h3>{site.url}</h3>
                    <h3>{site.description}</h3>
                    <h3>{site.approvedUsers}</h3>
                  </div>
                </div>
              )
            })}
            <div className="column">
              <div className="block block--none">
                <p>You haven't made a site yet.</p>
                <Link to="/site/new" className="button--main"> + Create a site</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sites: state.sites.sitesList.sites,
  isLoading: state.sites.sitesList.loading
})

Dashboard = connect(mapStateToProps)(Dashboard)

export default Dashboard