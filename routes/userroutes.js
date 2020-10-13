const express =require('express');
const auth = require('../middleware/authentication');
const router=express.Router();

const userRoutes = require('../controller/usercontroller');



router.get('/',    userRoutes.home);
router.get('/createacc',    userRoutes.createacc);
router.post('/submit', userRoutes.signup);
router.post('/login' ,userRoutes.login);
router.get('/logout',    userRoutes.logout);
router.get('/detail', auth.verify , userRoutes.getdetail);


module.exports = router;

