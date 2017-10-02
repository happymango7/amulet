import nodemailer from 'nodemailer'
require('dotenv').config({path: 'variables.env'});


exports.contactForm = (req, res) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.GMAILUSER,
			pass: process.env.GMAILPASS
		}
	});

	const response = JSON.stringify(req.body)

	const mailOptions = {
		from: 'contact@creatorsneverdie.com',
		to: 'dillonraphael@gmail.com, yngphnx@gmail.com',
		subject: 'CND',
		text: response
	}

	transporter.sendMail(mailOptions).then((info) => {
		res.json({mail: info.res})
	}).catch((error) => {
		console.log(error)
	})
}
