import express from 'express';
import passport from 'passport';
import pageController from '../controllers/pageController';
import siteController from '../controllers/siteController';
import userController from '../controllers/userController';
import mailController from '../controllers/mailController';
import { upload } from '../lib/multer.js';



const router    = express.Router();
const apiPrefix = '/api/v1';


/**
 * Get
 */
router.get(`${apiPrefix}/listPages`, pageController.listPages);
router.get(`${apiPrefix}/getPage`, pageController.getPage);
router.get(`${apiPrefix}/getPage/:id`, pageController.getPage);
router.get(`${apiPrefix}/siteData`, siteController.getSiteData);


/**
 * Post
 */
router.post(`${apiPrefix}/register`, userController.register);
router.post(`${apiPrefix}/login`, userController.signin);
router.post(`${apiPrefix}/verify`, userController.verify);

router.post(`${apiPrefix}/sendMail`, mailController.contactForm);

router.post(`${apiPrefix}/editSiteData`,
  passport.authenticate('jwt', {session: false}),
  siteController.editSiteData
);

router.post(`${apiPrefix}/createPage`,
  passport.authenticate('jwt', {session: false}),
  pageController.createPage
);
router.post(`${apiPrefix}/savePage`,
  passport.authenticate('jwt', {session: false}),
  pageController.savePage
);
router.post(`${apiPrefix}/uploadImage`,
  passport.authenticate('jwt', {session: false}),
  upload.any(),
  pageController.uploadImage
);


/**
 * Put
 */
router.put(`${apiPrefix}/editPage/:id`, pageController.editPage);


/**
 * Delete
 */
router.delete(`${apiPrefix}/deletePage/:id`, pageController.deletePage);
router.delete(`${apiPrefix}/deleteImage/:id`, pageController.deleteImage);


export default router;
