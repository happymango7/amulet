import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import AdminLayout from '../../components/admin/AdminLayout';
import FileIcon from '../../static/fileIcon.svg';
const instance = axios.create({baseURL: `/api/v1`});


import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; 




class CreatePage extends Component {

  /**
   * The data structure for that state this way we
   * can aways get a frech copy
   */
  static dataStruc () {
    return {
      edit: false,
      title: '',
      slug: '',
      content: [{
        className: '',
        body: '',
        files: [],
        attributes: [{
          title: '',
          source: ''
        }]
      }]
    };
  }


  constructor(props) {
    super(props);
    //assign 'getInitialProps' props to state
    this.state = {
      ...props,
      ...CreatePage.dataStruc()
    };
    this.addContentInput = this.addContentInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNestedContentChange = this.handleNestedContentChange.bind(this);
    this.handleNestedAttrChange = this.handleNestedAttrChange.bind(this);
    this.handleDeleteContent = this.handleDeleteContent.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('cnd.token');
    axios.defaults.headers.common.Authorization = 'JWT ' + token;
    const url = this.props.url;
    if (url.query && (url.query.id || url.query.title)) {
      //convers string value to number
      const id = url.query.id ? ~~url.query.id : null;
      const title = url.query.title;
      instance.get('getPage', {
        params: {
          id,
          title,
        }
      }).then((res) => {
        this.setState({
          id,
          edit: true,
          //breaks ref and makes a deep copy
          editCopy: JSON.parse(JSON.stringify(res.data)),
          ...res.data
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }


  handleChange(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value
    });
  }


  handleNestedContentChange(e) {
    const newStateContent = this.state.content;
    newStateContent[e.target.id][e.target.name] = e.target.value;
    this.setState({
      content: newStateContent
    });
  }


  addContentInput() {
    const contentInput = CreatePage.dataStruc().content;
    this.setState({content: this.state.content.concat(contentInput)});
  }


  /**
   * Takes attribute input and sets it in the state
   * @param  {---} e      -> event
   * @param  {num} cIndex -> The content index
   * @param  {num} aIndex -> The attribute index
   */
  handleNestedAttrChange(e, cIndex, aIndex) {
    const state = this.state;
    state.content[cIndex].attributes[aIndex][e.target.name] = e.target.value;
    this.setState(state);
  }


  /**
   * Deletes onClick event for attribute
   * @param  {num} cIndex -> The content index
   * @param  {num} aIndex -> The attribute index
   */
  deleteAttribute(cIndex, aIndex) {
    const state = this.state;
    state.content[cIndex].attributes.splice(aIndex, 1);
    this.setState(state);
  }


  /**
   * Deletes onClick event for deleting a content block
   * @param  {num} cIndex -> The content index
   * @param  {num} aIndex -> The attribute index
   */
  deleteContentBlock(cIndex) {
    const state = this.state;
    state.content.splice(cIndex, 1);
    this.setState(state);
  }

  handleDeleteContent(index) {
    confirmAlert({
      title: 'Confirm to delete',                        // Title dialog 
      message: 'Are you sure?',               // Message dialog 
      confirmLabel: 'Confirm',                           // Text button confirm 
      cancelLabel: 'Cancel',                             // Text button cancel 
      onConfirm: () => this.deleteContentBlock(index),    // Action after Confirm 
      onCancel: () => null,      // Action after Cancel 
    })
  }



  /**
   * Create new attribute for onClick "Add Attribute" Button
   * @param  {num} index -> The content index
   */
  addAttribute(index) {
    const state = this.state;
    const attribute = {
      title: '',
      source: ''
    };
    state.content[index].attributes.push(attribute);
    this.setState(state);
  }


  /**
   * Form submition handle
   * @param  {---} e -> event
   * @return {---}   -> post data via createPage
   */
  handleSubmit(e) {
    e.preventDefault();
    this.createPage({
      title: this.state.title,
      slug: this.state.slug,
      content: this.state.content,
    });
  }


  /**
   * Form submition handle
   * @param  {---} e -> event
   * @return {---}   -> post data via createPage
   */
  handleSave(e) {
    e.preventDefault();
    this.savePage({
      title: this.state.title,
      slug: this.state.slug,
      content: this.state.content,
    });
  }


  /**
   * Pushes image to state
   * @param  {num} i    -> context image ref
   * @param  {---} file -> asset file
   */
  onDrop(i, file) {
    const state = this.state;
    const files = state.content[i].files;
    files.push(file[0]);
    this.setState(state);
  }


  /**
   * Creates pages
   * - post file assets
   * - post content
   * @param  {obj} data -> state object
   */
  savePage(data) {
    const self = this;
    //helper to check if it has file
    const hasFiles = (val) => val.files && val.files.length;

    //extract asset files (images)
    const formData = new FormData();
    data.content.forEach((val, i) => {
      if (hasFiles(val)) {
        val.files.forEach((_val, _i) => {
          //makes sure the image is the corrent file type format and
          //not a image reffrance string
          if (_val.lastModified) {
            formData.append(`file-${i}-${_i}`, _val);
          }
        });
      }
    });

    //remove raw image reffrance and replace it image filename reffrance
    data.content = data.content.map((val) => {
      if (hasFiles(val)) {
        val.files = val.files.map(_val => _val.name || _val);
      }
      return val;
    });

    /**
     * imageUpload Post
     */
    const config = {
      onUploadProgress: progressEvent => {
        // do whatever you like with the percentage complete
        // maybe dispatch an action that will update a progress bar or something
        const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Asset Progress: ${percentCompleted}%`);
      }
    };
    instance.post('uploadImage', formData, config).then((response) => {
      console.log(`Success -> uploadImage: ${response}`);
    }).catch((error) => {
      console.log(error);
    });

    /**
     * savePage Post
     */
    instance.post('savePage', {
      newData: data,
      oldData: this.state.editCopy
    }).then((response) => {
      this.setState(Object.assign(self.state, response.data));
    }).then((response) => {
      Router.push('/admin/pages')
    }).catch((error) => {
      console.log(error);
    });
  }


  /**
   * Deletes the image off the server
   * @param  {str} fileName -> the file to delete
   */
  deleteImage(fileName) {
    instance.delete(`deleteImage/${fileName}`, {
      data: {
        fileName,
      }
    }).then((response) => {
      console.log(`Success -> deleteImage: ${fileName}`);
    }).catch((error) => {
      console.log(error);
    });
  }


  /**
   * Creates pages
   * - post file assets
   * - post content
   * @param  {obj} data -> state object
   */
  createPage(data) {
    //helper to check if it has file
    const hasFiles = (val) => val.files && val.files.length;

    //extract asset files (images)
    const formData = new FormData();
    data.content.forEach((val, i) => {
      if (hasFiles(val)) {
        val.files.forEach((_val, _i) => {
          formData.append(`file-${i}-${_i}`, _val);
        });
      }
    });

    //remove raw image reffrance and replace it image filename reffrance
    data.content = data.content.map((val) => {
      if (hasFiles(val)) {
        val.files = val.files.map(_val => _val.name);
      }
      return val;
    });

    /**
     * imageUpload Post
     */
    const config = {
      onUploadProgress: progressEvent => {
        // do whatever you like with the percentage complete
        // maybe dispatch an action that will update a progress bar or something
        const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Asset Progress: ${percentCompleted}%`);
      }
    };
    instance.post('uploadImage', formData, config).then((response) => {
      console.log(`Success -> uploadImage: ${response}`);
    }).catch((error) => {
      console.log(error);
    });

    /**
     * createPage Post
     */
    instance.post('createPage', data).then((response) => {
      //on response from db that the page is created
      //we now need to reflect those changes to our local state
      //and reset the form input
      const staticStuc = CreatePage.dataStruc();
      staticStuc.pages = response.data;
      this.setState(staticStuc);
    }).then(() => {
      Router.push('/admin/pages')
    }).catch((error) => {
      console.log(error);
    });
  }


  /**
   * Input for Title of page
   */
  createInputs() {
    return (
      <div className="columns">
        <div className="column">
          <label className="label">Title of Page</label>
          <input
            type="text"
            name="title"
            className="input"
            placeholder={`Title`}
            value={this.state.title}
            onChange={this.handleChange}/>
        </div>
        <div className="column">
          <label className="label">Slug</label>
          <input
            type="text"
            name="slug"
            className="input"
            placeholder={`Slug`}
            value={this.state.slug}
            onChange={this.handleChange}/>
        </div>
      </div>
    );
  }


  /**
   * Post content inputs
   * - Class Name
   * - Body
   * - Image
   */
  contentInputs() {
    const self = this;
    //removes asset from file-drop-upload
    const removeAsset = (i, _i, file) => {
      const state = self.state;
      const content = state.content;
      const updateContent = content[i];
      updateContent.files.splice(_i, 1);
      content[i] = updateContent;
      self.setState(state);
      if (state.edit) {
        self.deleteImage({fileName: file});
      }
    };

    return this.state.content.map((content, i)=> {
      return (
        <div key={i}>
          <div className="block">
            <button 
              className="button is-danger" 
              type="button" 
              onClick={() => {this.handleDeleteContent(i);}}
              style={{float: "right", left: "1rem", bottom: "1rem"}}
              >X</button>

            {/*classname and slug */}
            <div className="columns">
              <div className="column">
                <label className="label">Class Name</label>
                <input
                  type="text"
                  name="className"
                  className="input"
                  id={`${i}`}
                  placeholder="Class name"
                  onChange={this.handleNestedContentChange}
                  value={content.className || ''}
                />
              </div>
            </div>

            {/* Body */}
            <div className="columns">
              <div className="column">
                  <label className="label">Body</label>
                  <textarea
                    type="text"
                    name="body"
                    className="textarea"
                    placeholder="Body"
                    id={`${i}`}
                    onChange={this.handleNestedContentChange}
                    value={content.body || ''}
                  />
              </div>
            </div>

            
            {/*Attributes */}
            <div className="columns is-multiline">

              <label className="label" style={{paddingLeft: '1rem', marginBottom: '-0.5px'}}>Attributes</label>

              <div className="column is-12">
              {
                content.attributes.map((attr, __i) => {
                  return (
                    <div key={__i} className="columns">
                      <div className="column is-5">
                        <input
                          type="text"
                          name="title"
                          className="input"
                          id={`${__i}`}
                          placeholder="Attributes Title"
                          onChange={(e) => this.handleNestedAttrChange(e, i, __i)}
                          value={attr.title || ''}
                        />
                      </div>
                      <div className="column is-5">
                        <input
                          type="text"
                          name="source"
                          className="input"
                          id={`${__i}`}
                          placeholder="Attributes Source"
                          onChange={(e) => this.handleNestedAttrChange(e, i, __i)}
                          value={attr.source || ''}
                        />
                      </div>
                      <div className="column">
                      <button
                        className="button--danger"
                        type="button"
                        style={{cursor: "pointer"}}
                        onClick={() => this.deleteAttribute.call(this, i, __i)}
                      >Remove</button>
                      </div>
                    </div>
                  );
                })
              }
              </div>

            </div>

            <div>
                <button 
                  className="button--action" 
                  type="button"
                  style={{marginBottom: "3rem"}} 
                  onClick={() => this.addAttribute.call(this, i)}>
                  + Add Attribute</button>
            </div>


            {/*
              Asset Drop (images)
              https://react-dropzone.netlify.com/#proptypes
            */}
            <div className="columns is-multiline">
              <div className="column is-12">
                <label className="label">Upload Attachments</label>
              </div>
              <div className="column is-5">
                <ul className="files">
                  {
                    content.files.map((file, _i) => {
                      return (
                        <li key={_i}>
                          {/* self.state.edit && !file.size
                            ? `File Name: ${file}`
                            : `${file.name} - ${file.size} bytes Large` */}
                            <div className="iconContainer">
                              {<FileIcon />}
                            </div>
                            <div className="fileContainer">
                              {file}
                            </div>
                            <div>
                              <a className="button--danger"
                                onClick={() => {removeAsset(i, _i, file);}}
                                style={{marginLeft: "1rem"}}>
                                Remove
                              </a>
                            </div>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="column is-6">
                <div className="dropzone">
                  <Dropzone
                    onDrop={this.onDrop.bind(this, i)}
                    style={{border: "0px"}}
                    className="fileUploader">
                    <p>Try dropping some files here, or click to select files to upload.</p>
                  </Dropzone>
                </div>
              </div>
              
            </div>
          </div>
        
        <hr />

        </div>
      );
    });
  }


  /**
   * Content creation buttons
   */
  contentControl() {
    return (
      <div className="mt-1">
        <button
          className="button--action"
          type="button"
          style={{width: "50px", float: "left", fontSize: "30px"}}
          onClick={this.addContentInput}>
          +</button>
        <input 
          className="button--main" 
          style={{float: "right", marginTop: "0", paddingTop: "0", border: "0px", cursor: "pointer" }} 
          type="submit"
          value={this.state.edit ? 'Save Edits' : 'Submit'}
        />
      </div>
    );
  }



  /**
   * Render
   */
  render() {
    const state = this.state;
    return (
      <AdminLayout url={this.props.url}>
        <div className="Pages section">
          <h1>{state.edit ? 'Edit Page' : 'Create Page'}</h1>

          <form
            onSubmit={this.state.edit ? this.handleSave : this.handleSubmit}
            className='field'>
            <div className="block">
            {this.createInputs()}
            </div>
            <h1>Content</h1>
              {this.contentInputs()}
            <div className="controlContainer">
              {this.contentControl()}
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}
CreatePage.propTypes = {
  url: PropTypes.object.isRequired,
};


export default CreatePage;
