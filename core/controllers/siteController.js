import winston from 'winston';


exports.getSiteData = async (req, res) => {
    winston.log('info', 'getSiteData', { body: req.body });
    const db = await req.app.get('db');
    const site = await db.get(`metaData`);
    res.json(site);
};

exports.editSiteData = async (req, res) => {
    winston.log('info', 'editSiteData', {body: req.body});
    const db = await req.app.get('db');
    const site = await db.get(`metaData`).assign(req.body).write();
    res.json(site);
};