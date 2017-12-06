import React, { Component } from 'react'
import {Field} from 'redux-form'

class SiteForm extends Component {
  componentWillMount() {
    if (this.props.init) {
      this.props.initialize(this.props.site)
    }
  }

  componentWillReceiveProps(props) {
    if(this.props.init) {
      props.initialize(props.site)
    }
  }

  render() {
    const { site, submit, handleSubmit, pristine, reset, submitting } = this.props
    console.log(submit)
    return (
      <form onSubmit={handleSubmit(submit)}>
        <div className="block">
          <label>Site Name</label>
          <Field 
            className="input" 
            type="text"
            component="input"
            name="title" />
        </div>
        <div className="block">
          <label>Site URL</label>
          <Field 
            className="input" 
            type="text"
            component="input"
            name="url" />
        </div>
        <div className="block">
          <label>Description</label>
          <Field 
            className="input" 
            type="text"
            component="textarea"
            name="description" />
        </div>
        <div className="block">
          <label>Approved Users</label>
          <Field 
            className="input" 
            type="text"
            component="input"
            name="approvedUsers" />
        </div>
        {this.props.init ? <button type="submit" disabled={submitting} className="button--action">Edit</button> : <button type="submit" className="button--action">Create</button> }
      </form>
    )
  }
}

export default SiteForm