const Minimal = require('./src/minimal');
const CONFIG = require('./config');

const app = new Minimal();

const server = app.listen(CONFIG.PORT, () => console.log(`Server running on ${CONFIG.PORT}`));
