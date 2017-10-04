import React, {Component} from 'react';
import axios from 'axios';
import Head from 'next/head';
import AdminLayout from '@site/components/admin/AdminLayout';
import adminStyleSheet from '@site/static/styles/admin/main.scss'
const instance = axios.create({baseURL: `/api/v1`});


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + window.localStorage.getItem('amulet.token');
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value
    });
  }

  signIn(email, password) {
    instance.post('login', {email: email, password: password}).then((response) => {
      this.setState({
        loggedIn: true
      });
      if (response.data.success) {
        window.localStorage.setItem('amulet.token', response.data.token);
        window.location.replace('/admin');
        axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('amulet.token');
      }else {
        this.setState({
          error: response.data.message
        });
      }

    }).catch((error) => {
      console.log(error);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.signIn(this.state.email, this.state.password);
  }

  render() {
    return(
      <div>
        <Head>
          <title>{`Admin | Login `}</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <style dangerouslySetInnerHTML={{__html: adminStyleSheet}} />
        <div className="Login section">
          <div className="container">
            <h1>Login</h1>
            <div className="block">
              <form onSubmit={this.handleSubmit}>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder={'Enter your email'}
                  onChange={this.handleChange}
                  value={this.state.email || ''}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder={'Enter your password'}
                  onChange={this.handleChange}
                  value={this.state.password || ''}
                />
                <input 
                  type="submit" 
                  className="button--main"
                  style={{marginTop: "0", paddingTop: "0", border: "0px", cursor: "pointer" }} 
                  value={'Submit'}/>
              </form>
            </div>

            <p>
              {this.state.error ? this.state.error : null}
            </p>
          </div>
        </div>
        {/*Closing Div */}
      </div>
    );
  }
}


export default Login;
