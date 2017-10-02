import winston from 'winston';
import del from 'del';
// import Page from '../models/Page';

exports.createPage = async (req, res) => {
  winston.log('info', 'createPage', { body: req.body });
  const db = await req.app.get('db');
  const page = await db.get('pages').push(req.body).write();
  res.json(page);
};

exports.savePage = async (req, res) => {
  winston.log('info', 'savePage', { body: req.body });
  const {newData, oldData} = req.body;
  const db = await req.app.get('db');
  const page = await db.get('pages')
    .find(oldData)
    .assign(newData)
    .write();
  res.json(page);
};

exports.listPages = async (req, res) => {
  winston.log('info', 'listPages', { body: req.body });
  const db = await req.app.get('db');
  const pages = await db.get('pages');
  res.json(pages);
};

exports.editPage = async (req, res) => {
  winston.log('info', 'editPage', { body: req.body });
  const db = await req.app.get('db');
  const page = await db.get(`pages[${req.params.id}]`).assign(req.body);
  res.json(page);
};

exports.getPage = async (req, res) => {
  winston.log('info', 'getPage', {
    params: req.params,
    query: req.query,
  });
  const db = await req.app.get('db');
  //assign
  let { id, title } = req.params;
  if (!id && !title) {
    ({ id, title } = req.query);
  }
  //get
  let page = null;
  if (id) {
    page = await db.get(`pages[${req.params.id}]`).value();
  }else if(title) {
    page = await db.get('pages').value().filter((val) => {
      return title === val.title;
    });
    page = Array.isArray(page) ? page.pop() : page;
  }
  res.json(page);
};

exports.deletePage = async (req, res) => {
  winston.log('info', 'deletePage', { body: req.body });
  const db = await req.app.get('db');
  const page = await db.get(`pages[${req.params.id}]`).value();
  res.json(db.get(`pages`).remove(page).write());
};

exports.deleteContent = async (req, res) => {
  const db = await req.app.get('db');
  const page = await db.get(`pages[${req.params.id}]`).value();
};

exports.deleteImage = async (req, res) => {
  winston.log('info', 'deleteImage', { body: req.body });
  const { fileName } = req.body;
  if (fileName) {
    del.sync([`./static/uploads/${fileName}`]);
  }
  return res.status(200).send(fileName);
};

exports.uploadImage = (req, res) => {
  winston.log('info', 'uploadImage');
  /**
   * Various file type verification/logic can be added here
   * docs: https://github.com/expressjs/multer#filefilter
   */
  return res.status(200).send(req.files);
};
