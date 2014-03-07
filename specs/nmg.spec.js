var nmg = require('../');

var specification = {
    'name': 'fooooooo',
    'Module description': 'MOOOO',
    'Your name': 'André König'
};

nmg.generate('akoenig.library', specification)
    .once('error', function (err) {
        return console.error(err.toString());
    });