const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const PORT = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append server.log');
		}
	});
	console.log(log);

	next();
});


// app.use((req, res, next) => {
	// res.render('maintenance.hbs', {
		// pageTitle: 'Maintenance  page',
		// welcomeText: 'We will come back!',		
	// });
// });

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeText: 'Greetings peasant!',
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects',
		projectText: 'Protfolio page here'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request!'
	});
});



app.listen(PORT, () => {
	console.log('Server is up on port:', PORT);
});