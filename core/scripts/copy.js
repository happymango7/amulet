import {ncp} from 'ncp';

const adminPath = './core/views';
const adminDestPath = './site/pages/admin';

const adminStylePath = './core/styles';
const adminStyleDestPath = './site/static/styles/admin';

const adminStaticPath = './core/static';
const adminStaticDestPath = './site/static';

const adminComponentsPath = './core/components';
const adminComponentsDestPath = './site/components/admin';

export default function () {

  console.log('Copying admin files....');
  ncp(adminPath, adminDestPath, function (err) {
    if (err) {
      return console.error(err);
    }
  
    console.log('Copying admin view files complete.');
  });
  
  ncp(adminStaticPath, adminStaticDestPath, function (err) {
    if (err) {
      return console.error(err);
    }
  
    console.log('Copying admin static files complete.');
  });
  
  ncp(adminStylePath, adminStyleDestPath, function (err) {
    if (err) {
      return console.error(err);
    }
  
    console.log('Copying admin styles complete.');
  });

  ncp(adminComponentsPath, adminComponentsDestPath, function (err) {
    if (err) {
      return console.error(err);
    }
  
    console.log('Copying admin components complete.');
  });
  
}

