const minimal = require('./src/minimal');
const CONFIG = require('./config');

const app = minimal();

const server = app.listen(CONFIG.PORT, () => console.log(`Server running on ${CONFIG.PORT}`));
