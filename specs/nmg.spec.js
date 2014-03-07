var nmg = require('../');

nmg.generate('akoenig.library', {})
    .once('error', function (err) {
        return console.error(err.toString());
    });