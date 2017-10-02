require('dotenv').config({path: 'variables.env'});

module.exports = {
	secret: process.env.SECRET
}