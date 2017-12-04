import express from 'express';
import passport from 'passport';
import pageController from '../controllers/pageController';
import siteController from '../controllers/siteController';
import userController from '../controllers/userController';
import mailController from '../controllers/mailController';
import { upload } from '../lib/multer.js';



const router    = express.Router();
const apiPrefix = "/api"

router.get('/', pageController.home);


/**
 * Get
 */

router.get(`/api/listSites`, siteController.listSites);
router.get(`/api/getSite/:id`, siteController.getSite);




/**
 * Post
 */
router.post(`${apiPrefix}/register`, userController.register);
router.post(`${apiPrefix}/login`, userController.signin);
router.post(`${apiPrefix}/verify`, userController.verify);

router.post(`${apiPrefix}/sendMail`, mailController.contactForm);



router.post(`${apiPrefix}/createSite`,
  // passport.authenticate('jwt', {session: false}),
  siteController.createSite
);
router.post(`${apiPrefix}/saveSite`,
  passport.authenticate('jwt', {session: false}),
  siteController.saveSite
);
router.post(`${apiPrefix}/uploadImage`,
  passport.authenticate('jwt', {session: false}),
  upload.any(),
  siteController.uploadImage
);


/**
 * Put
 */
router.put(`${apiPrefix}/editSite/:id`, siteController.editSite);


/**
 * Delete
 */
router.delete(`${apiPrefix}/deleteSite/:id`, siteController.deleteSite);
router.delete(`${apiPrefix}/deleteImage/:id`, siteController.deleteImage);


export default router;
