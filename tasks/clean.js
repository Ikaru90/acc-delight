const task = require('./task');
const rimraf = require('rimraf');

task('clean', function() {
    return new Promise(function(resolve, reject) {
        rimraf('build', function(err) {
            if(err) {
                console.log('Ошибки при удалении папки сборки.');
                reject();
            }
        });
        rimraf('build', function(err) {
            if(err) {
                console.log('Ошибки при удалении временной папки сборки.');
                reject();
            }
        });
    })
});