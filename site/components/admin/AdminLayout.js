import React, {Component} from 'react';
import Head from 'next/head';
import axios from 'axios';
import PropTypes from 'prop-types';
import verify from '@site/components/admin/utils/verify';
import Header from '@site/components/admin/Header';
import Loader from '@site/components/admin/Loader';

const instance = axios.create({baseURL: `/api/v1`});


import adminStyleSheet from '@site/static/styles/admin/main.scss'



const IsLoading = () =>
  <div className="container">
    <div className="columns is-mobile is-centered"><Loader /></div>
  </div>;


class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: true,
      metaData: []
    };
  }

  componentDidMount() {
    this.getMetaData();
    const token = localStorage.getItem('amulet.token');
    axios.defaults.headers.common.Authorization = 'JWT ' + token;
    const setLoginState = () => {
      this.setState({
        loggedIn: true,
        loading: false,
      });
    };
    console.log(this.props.url.pathname);

    //verifies user and invokes setLoginState or redirects to login page if failed
    verify.call(this, token, setLoginState);
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


  render() {
    const siteTitle = this.state.metaData.length ? this.state.metaData[0].siteTitle : 'Title';
    
    return(
      <div>
        <Head>
          <title>{`Admin |` + siteTitle}</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <style dangerouslySetInnerHTML={{__html: adminStyleSheet}} />
        <Header url={this.props.url} />
        {this.state.loading
          ? <IsLoading />
          : this.props.children
        }
      </div>
    );
  }
}
AdminLayout.propTypes = {
  children: PropTypes.object.isRequired,
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  })
};


export default AdminLayout;
