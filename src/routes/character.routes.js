const router = require('express-promise-router')();
const CharacterController = require('../controllers/character.controller');

router.get('/characters', CharacterController.getallCharacters);
router.get('/characters/:id', CharacterController.getCharactersById);

module.exports = router;
