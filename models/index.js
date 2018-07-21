var fs = require('fs');
let _ = require('lodash');

// Read directory for any new file and export modules with the file name
fs.readdirSync(__dirname).forEach(function(f1){
    let fullPath = __dirname + '/' + f1;
    let fp = ["USERS", "MASTERS"]
    if(f1!='common' && f1!=="index.js" && !_.includes(fp,f1)){
        var m1 = f1.split('.')[0];
        exports[m1] = require('./' + m1);
    }
    if(fs.statSync(fullPath).isDirectory()){
        fs.readdirSync(fullPath).forEach(function(f2){
            var m2 = f2.split('.')[0];
            exports[f1+'.'+m2] = require('./'+f1+'/'+m2);
        });
    }
});