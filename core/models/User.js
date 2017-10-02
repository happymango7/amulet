import db from '../db';
import Promise from 'promise';
import bcrypt from 'bcryptjs';


export default class User {
  model = {
    email: '',
    password: ''
  }
  constructor(newUser) {
    this.model.id = newUser.id ? newUser.id : db.get('users').size() + 1;
    this.model.email = newUser.email;
    this.model.password = newUser.password;
  }


  save() {
    return User.addUser(this);
  }

  static addUser(newUser) {
    return new Promise((resolve, reject) => {
      const isExist = db.get('users').find({'email': newUser.model.email}).value();
      if(isExist) {
        reject(new Error('Email Duplicated'));
      } else {
        // ----- Bcrypt ---- ///
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(newUser.model.password, salt);

        newUser.model.password = hash;
        // ----- Bcrypt ---- ///

        db.get('users').push(newUser.model).write();
        resolve(newUser);
      }

    });
  }


  comparePassword(pw, cb) {
    // ----- Plain Password ------ //
    // if( this.model.password !== pw ){
    //  cb(null, false);
    // }
    // cb(null, true);
    // ----- Plain Password ------ //

    console.log(pw, this.model);
    const bool = bcrypt.compareSync(pw, this.model.password);
    cb(null, bool);
  }
}
