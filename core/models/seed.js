import bcrypt from 'bcryptjs';
const defaultdb = {
  metaData: [
    {
      siteTitle: 'Amulet',
      siteDescription: 'A CMS built for the future'
    }
  ],
  pages: [
    {
      title: 'Home',
      slug: 'home',
      content: [{className: 'wrapper', body: 'lorem ipsum'}]
    }
  ],

  users: [
    {
      id: 1,
      email: process.env.INIT_USER || 'admin@admin.com',
      password: bcrypt.hashSync(process.env.INIT_PASS || 'password', bcrypt.genSaltSync())
    }
  ]
};

export default defaultdb;
