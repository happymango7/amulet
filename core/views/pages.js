import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AdminLayout from '../../components/admin/AdminLayout';
import Loader from '../../components/Loader';
import Link from 'next/link';
import ClickOutside from 'react-click-outside';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; 

const instance = axios.create({baseURL: `/api/v1`});


class Pages extends Component {

  /**
   * The data structure for that state this way we
   * can aways get a frech copy
   */
  static dataStruc () {
    return {
      loading: true,
      settingPanel: false,
      pages: [],
    };
  }


  constructor(props) {
    super(props);
    this.state = {
      ...Pages.dataStruc()
    };
    this.deletePage = this.deletePage.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  /**
   * Fetches/sets page data and common headers
   */
  componentDidMount() {
    const token = localStorage.getItem('cnd.token');
    axios.defaults.headers.common.Authorization = 'JWT ' + token;

    instance.get('listPages').then((res) => {
      this.setState({
        loading: false,
        pages: res.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  }


  /**
   * Deletes Pages
   * @param  {num} id -> index ref
   */
  deletePage(id) {
    instance.delete(`deletePage/${id}`).then((response) => {
      //on response from db that the page is deleted
      //we now need to reflect those changes to our local state
      if (response && response.data) {
        this.setState({pages: response.data});
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  handleDelete(index) {
    confirmAlert({
      title: 'Confirm to delete',                        // Title dialog 
      message: 'Are you sure?',               // Message dialog 
      confirmLabel: 'Confirm',                           // Text button confirm 
      cancelLabel: 'Cancel',                             // Text button cancel 
      onConfirm: () => this.deletePage(index),    // Action after Confirm 
      onCancel: () => null,      // Action after Cancel 
    })
  }

  showSettings() {
    this.state.settingPanel ? this.setState({settingPanel: false}) : this.setState({settingPanel: true})
  }

  hide() {
    this.setState({settingPanel: false});
  }


  /**
   * Post display logic
   */
  viewPublishedPages() {

    const pages = this.state.pages;
    
    return (
      <div>
        <div className="block">
          {pages.map((val, i) => {
            let dropdown = 'none';
            return (
              <div key={i} className="columns">
                <div className="column is-10">
                  <p>PUBLISHED</p>
                  <h2>{val.title}</h2>
                </div>
                <div className="column">
                  <div className="settings">
                    <div className="arrow__container">
                      <div className="arrow" onClick={this.showSettings} />
                    </div>
                    {
                      this.state.settingPanel 
                        ?
                         <ClickOutside onClickOutside={::this.hide}>
                        <div className="arrow__dropdown">
                          <Link href={{pathname: '/admin/edit-page', query: {title: val.title}}}>
                            <a className="arrow__dropdown__link">Edit</a>
                          </Link>
                          <button
                            className="arrow__dropdown__delete"
                            onClick={() => this.handleDelete(i)}>Delete</button>
                        </div>
                        </ClickOutside> 
                        : null
                    }

                  </div>
                </div>
              </div>
            );
          })}
        </div>
 

      </div>
    );
  }


  /**
   * Render
   */
  render() {
    // Wrapper for simple Loader component
    const IsLoading = () =>
      <div className="box">
        <div style={{height: '50vh', alignItems: 'center'}} className="columns is-mobile is-centered"><Loader /></div>
      </div>;

    return (
      <AdminLayout url={this.props.url}>
        <div className="Pages section">
          <div className="container">
              <div className="columns">
                <div className="column is-9">
                  <h1>PUBLISHED PAGES({this.state.pages.length})</h1>
                </div>
                <div className="column is-3">
                <Link href={{pathname: '/admin/create-page'}}>
                  <a className="button--main">+ New Page</a>
                </Link>
                </div>
              </div>
              {this.state.loading
                ? <IsLoading />
                : this.viewPublishedPages()
              }
          </div>
        </div>
      </AdminLayout>
    );
  }
}
Pages.propTypes = {
  url: PropTypes.object.isRequired,
};



export default Pages;
