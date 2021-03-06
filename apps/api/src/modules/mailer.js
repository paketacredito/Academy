/* eslint-disable object-property-newline */
/* eslint-disable no-undefined */
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass } = require('../../config/mail.json');

const transport = nodemailer.createTransport({
	host,
	port,
	'auth': { user, pass }
});

transport.use(
	'compile',
	hbs({
		'viewEngine': {
			'defaultLayout': undefined,
			'partialsDir': path.resolve('./src/templates')
		},
		'viewPath': path.resolve('./src/templates'),
		'extName': '.html'
	})
);

module.exports = transport;
