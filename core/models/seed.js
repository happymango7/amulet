import bcrypt from 'bcryptjs';

const defaultdb = {

  sites: [
    {
      id: 0,
      title: 'Site 1',
      url: 'http://localhost:1337',
      pages: [
        {
          title: 'Home', 
          body: 'lorem ipsum',
          content: [
            {
              className: 'header',
              content: 'lorem ipsum'
            }
          ]
        }
      ]
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
