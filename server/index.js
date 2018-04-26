import http from 'http';
import app from './server';
import serverConfig from './util/config';

const server = http.createServer(app);
let currentApp = app;

// start app
server.listen(serverConfig.port, (error) => {
    if (error) {
        console.log(`Error starting server`); // eslint-disable-line
    }
});
// hot reload
if (module.hot) {
    module.hot.accept('./server', () => {
        server.removeListener('request', currentApp);
        server.on('request', app);
        currentApp = app;
    });
}
