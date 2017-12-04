import React, { Component } from 'react'
import {Field} from 'redux-form'

class SiteForm extends Component {
  componentWillMount() {
    if (this.props.init) {
      this.props.initialize(this.props.site)
    }
  }

  render() {
    const { site, submit, handleSubmit, pristine, reset, submitting } = this.props
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
        <button className="button--action">Create</button>
      </form>
    )
  }
}

export default SiteForm