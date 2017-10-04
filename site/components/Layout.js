import React, {Component} from 'react';
import Head from 'next/head';
import axios from 'axios';
const instance = axios.create({baseURL: `/api/v1`});
import stylesheet from  '@site/static/styles/main.scss'


const IsLoading = () =>
  <div className="container">
    <div>loading</div>
  </div>;

class Layout extends Component {
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
    this.setState({
      loggedIn: localStorage.getItem('amulet.token') ? true : false,
      loading: false
    });
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

  makeChildren(title) {
    if(this.state.loading) {
      return (
        <div>
          <IsLoading />
        </div>
      )
    } else {
      return (
        <div>
            {this.props.children}
        </div>
      )
    }
  }



  render() {

    const siteTitle = this.state.metaData.length ? this.state.metaData[0].siteTitle : null;
    const siteDescription = this.state.metaData.length ? this.state.metaData[0].siteDescription : null;

    return(
      <div>
        <Head>
          <title>{siteTitle}</title>
          <meta name="description" content={siteDescription} />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <style dangerouslySetInnerHTML={{__html: stylesheet}} />
        </Head>
        {this.makeChildren(siteTitle)}
      </div>
    )
  }
}


export default Layout;
