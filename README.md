# Amulet

A flat file CMS built on Next.js

The idea behind Amulet is to keep hosting cheap (more on that soon), making sure development is easy and flexible, SEO ready, and having the ability to edit your sites content without touching a terminal.

Most of the heavy lifting is done by the awesome [Next.js](https://github.com/zeit/next.js/) framework. Their mission it seems is to make React work on the web like PHP does, so it was no-brainer to use their build process.


## Getting Started

Clone the repository:

`git clone git@github.com:dillonraphael/amulet.git`

Make sure you have npm installed, and run `npm install` inside the amulet directory. Then copy the sample environment variables into it's own file named `variables.env` . 

Example:
```
    NODE_ENV=development
    
    SECRET=mysecret
    
    INIT_USER=admin@admin.com
    INIT_PASS=password
    
    GMAILUSER=admin@gmail.com
    GMAILPASS=password
```
That's it! Now run `npm run dev` and go to `[localhost:1337/admin](http://localhost:1337/admin)` and login with user info stated in the environment variables file.


## How it works

Next.js takes only a single directory, in our case it being the `site` directory. When you run Amulet, it automatically copies the appropriate files for the admin dashboard to your `site` folder.

 

## Development

Whether you're developing the frontend of your site, or looking to contribute to Amulet, you must import components using the supplied alias `@site` 

eg.
```
    import React, {Component} from 'react';
    import Layout from '@site/components/Layout';
    
    
    
    class Index extends Component {
     render() {
     return(
     <Layout>
     <div className="Index">
     <h1>Amulet installed</h1>
     </div>
     </Layout>
     );
     }
    }
    
    
    export default Index;
```
You can create your own custom aliases inside `.babelrc` located in the root directory.
```
    ...
    
    "alias": {
     "styles": "./static/styles",
     "@site": "./site"
     },
    ...
```
## Handling Assets

Amulet includes loaders for `css` & `scss` . More coming soon. Unfortunately, the image loader doesn't support aliases. To use an image, use relative routes. eg:

    <img src="/static/icon.svg" />

## "Database"

Amulet doesn't use any database, so separate server power isn't needed to run your site. Instead, I opted to use a simple JSON file. The db file is stored inside `./core/db/` 

By default, the database is stored UNENCRYPTED for development purposes. Although, all passwords are still stored encrypted.

If you'd like to make sure your JSON file is encrypted, make sure to remove these 2 lines of code:

    const db = low('./core/db/db.json');
    export { db };

Then uncomment:

    export const db = low('./core/db/db-encrypted.json', {
     format: {
     deserialize: (str) => {
     try {
     const decrypted = cryptr.decrypt(str);
     const obj = JSON.parse(decrypted);
     return obj;
     } catch (e) {
     return JSON.parse(str);
     }
     },
     serialize: (obj) => {
     const str = JSON.stringify(obj);
     return str;
     }
     },
    });

## SEO

One of the great things about Next.js is how they handle SEO. For more information, check their documentation [here](https://github.com/zeit/next.js#custom-document) .

## Routes

These are the main routes that you need to know:

n = current version (v1)

GET

 `/api/vn/listPages` 

 `/api/vn/getPage/:id` 

 `/api/vn/siteData` 

POST

 `/api/vn/sendMail` 

The database is passed to every request. If you want to create your own routes and need access to the database it's as simple as:

 `const db = await req.app.get('db');` 

You're then open up to functions such as `.get()` , `.push()` , `.write()` and [more](https://github.com/typicode/lowdb) .

# Next on the docket:

- [ ]  Newsletter feature
- [ ]  User management system
- [ ]  Implement single state management (redux, mobx etc..)
- [ ]  Lock down site folder, and create theme directory