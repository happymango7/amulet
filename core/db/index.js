import seed from '../models/seed.js';
import low from 'lowdb';
import Cryptr from 'cryptr';
require('dotenv').config({path: 'variables.env'});
const cryptr = new Cryptr(`${process.env.SECRET}`);

export const initDb = function(db) {
  db.defaults(seed).write();
};

// un-encypted db
const db = low('./core/db/db.json');
export { db };

// export const db = low('./core/db/db-encrypted.json', {
//   format: {
//     deserialize: (str) => {
//       try {
//         const decrypted = cryptr.decrypt(str);
//         const obj = JSON.parse(decrypted);
//         return obj;
//       } catch (e) {
//         return JSON.parse(str);
//       }
//     },
//     serialize: (obj) => {
//       const str = JSON.stringify(obj);
//       // const encrypted = cryptr.encrypt(str);
//       return str;
//     }
//   },
// });


