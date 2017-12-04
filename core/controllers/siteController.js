import winston from 'winston';



exports.createSite = async (req, res) => {
    winston.log('info', 'createSite', { body: req.body });
    const db = await req.app.get('db');
    const id = await db.get('sites').value().length -1+1
    const sites = await db.get('sites').push({id: id, ...req.body}).write();
    res.json(sites);
  };
  
  exports.saveSite = async (req, res) => {
    winston.log('info', 'saveSite', { body: req.body });
    const {newData, oldData} = req.body;
    const db = await req.app.get('db');
    const site = await db.get('sites')
      .find(oldData)
      .assign(newData)
      .write();
    res.json(site);
  };
  
  exports.listSites = async (req, res) => {
    winston.log('info', 'listSites', { body: req.body });
    const db = await req.app.get('db');
    const sites = await db.get('sites');
    res.json(sites);
  };
  
  exports.editSite = async (req, res) => {
    winston.log('info', 'editSite', { body: req.body });
    const db = await req.app.get('db');
    const site = await db.get(`sites[${req.params.id}]`).assign(req.body);
    res.json(site);
  };
  
  exports.getSite = async (req, res) => {
    winston.log('info', 'getSite', {
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
    let site = null;
    if (id) {
      site = await db.get(`sites[${req.params.id}]`).value();
    }else if(title) {
      site = await db.get('sites').value().filter((val) => {
        return title === val.title;
      });
      site = Array.isArray(site) ? site.pop() : site;
    }
    res.json(site);
  };
  
  exports.deleteSite = async (req, res) => {
    winston.log('info', 'deleteSite', { body: req.body });
    const db = await req.app.get('db');
    const site = await db.get(`sites[${req.params.id}]`).value();
    res.json(db.get(`sites`).remove(site).write());
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

