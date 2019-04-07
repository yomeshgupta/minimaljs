const cors = require('cors');
const fs = require('fs');
const path = require('path');

const minimal = require('./src/minimal');
const CONFIG = require('./config');

const app = minimal();

app.use(cors());

app.get('/about', (req, res) => {
	res.send('I am the about page');
});

app.get('/', (req, res) => {
	fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
		if (err) {
			return res.status(500).send('Error Occured');
		}
		return res.status(200).send(data);
	});
});

const server = app.listen(CONFIG.PORT, () => console.log(`Server running on ${CONFIG.PORT}`));
