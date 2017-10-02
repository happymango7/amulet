import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';

const instance = axios.create({baseURL: `/api/v1`});


class AdminIndex extends Component {
  static adminDataStruc () {
    return {
      loading: true,
      metaData: []
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      ...AdminIndex.adminDataStruc()
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const token = localStorage.getItem('cnd.token');
    axios.defaults.headers.common.Authorization = 'JWT ' + token;
    this.getMetaData();
  }


  getMetaData() {
    instance.get('siteData').then((res) => {
      this.setState({
        metaData: res.data
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  handleChange(e) {
    const newMetaData = this.state.metaData;
    newMetaData[0][e.target.name] = e.target.value;
    this.setState({
      metaData: newMetaData
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    instance.post('editSiteData', this.state.metaData).then((res) => {
      window.location.reload(false)
    }).catch((error) => {
      console.log(error);
    });
  }


  render() {
    const siteTitle = this.state.metaData.length ? this.state.metaData[0].siteTitle : 'Title';
    const siteDescription = this.state.metaData.length ? this.state.metaData[0].siteDescription : 'Description';

    return (
      <AdminLayout url={this.props.url}>
        <div className="AdminIndex section">
          <div className="container">
            <h1>{siteTitle}</h1>
            <div className="block">
              <form>
                <div className="field">
                  <label className="label">SITE NAME</label>
                  <input
                    type="text"
                    name="siteTitle"
                    className="input"
                    value={siteTitle}
                    onChange={this.handleChange}/>
                </div>
                <div className="field">
                  <label className="label">SITE DESCRIPTION</label>
                  <input
                    type="text"
                    name="siteDescription"
                    className="input"
                    value={siteDescription}
                    onChange={this.handleChange}/>
                </div>
              </form>
            </div>
            <a onClick={this.handleSubmit} className="button--main">Submit</a>
          </div>

        </div>
      </AdminLayout>
    );
  }

}
AdminIndex.propTypes = {
  url: PropTypes.object.isRequired,
};

export default AdminIndex;
