const cors = require('cors');
const fs = require('fs');
const path = require('path');

const minimal = require('./src/minimal');
const CONFIG = require('./config');

const app = minimal();

app.use('/about', cors());
app.use('/about', (req, res, next) => {
	res.send('I am the about page');
	next();
});

app.use('/', (req, res, next) => {
	fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
		if (err) {
			res.status(500).send('Error Occured');
			return next();
		}
		res.status(200).send(data);
		return next();
	});
});

const server = app.listen(CONFIG.PORT, () => console.log(`Server running on ${CONFIG.PORT}`));
