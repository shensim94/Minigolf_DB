const router = module.exports = require('express').Router();

router.use('/club_members', require('./club_members').router);
router.use('/clubs', require('./clubs').router);