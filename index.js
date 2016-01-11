var promise = require('bluebird');
var fs = require('fs');
var request = require('request');
var needle = require('needle');


//Task 1

promise.promisifyAll(fs);
fs.readFileAsync('test.json').then(JSON.parse).then(function(json){
    console.log(json);
}).catch(SyntaxError, function(e){
    console.error('invaild file json', e.message);
}).catch(function (e) {
    console.log('unable to read file', e.message);
});

//#Task 2

console.time('xx');
var readFileAsync = promise.promisify(fs.readFile);
console.time('xx');

readFileAsync('test.json').then(JSON.parse).then(function (json) {
    console.log(json);
}).catch(SyntaxError, function (e) {
    console.error('invaild file json', e.message);
}).catch(function (e) {
    console.log('unable to read file', e.message);
});

//#Task 3:


var photoLink = {
    link: 'https://unsplash.imgix.net/photo-1425235024244-b0e56d3cf907?fit=crop&fm=jpg&h=700&q=75&w=1050',
    name: 'dog.jpg'
};

console.time('xxx');
function getPhoto(photoLink){
    return new promise(function (fullFill, reject) {
        request.get(photoLink.link)
            .on('error', function (err) {
                err.photo = photoLink.link;
                reject(err);
            })
            .pipe(fs.createWriteStream(photoLink.name)
                .on('finish', function () {
                    fullFill(photoLink.name);
                })
                .on('error', function (err) {
                    reject(err);
                })
            )
    })
}
getPhoto(photoLink)
    .then(function (result) {
        console.log('Done to write file', result);
        console.timeEnd('xxx');
    })
    .catch(function (err) {
        console.log('Error: ', err.message);
    });

//#Task 3.1

var getAsync = promise.promisify(needle.get);
console.time('xxx');
getAsync('http://ip.jsontest.com').then(function (res) {
    console.log(res.body.ip);
    return res.body.ip;
}).then(function (ip) {
    return getAsync('http://www.geoplugin.net/json.gp?ip='+ ip);
}).then(function (res) {
    console.log(res.body);
    console.timeEnd('xxx');
}).catch(function (err) {
    console.error('Error: '+ err);
});

//#Task 3.2:

var getAsync = promise.promisify(needle.get);
var writeFileAsync = promise.promisify(fs.writeFile);

var ipDecodePromise = getAsync('http://ip.jsontest.com')
    .then(function (res) {
        //console.log(res.body.ip);
        return res.body.ip;
    });
ipDecodePromise.then(function (res) {
    console.log(res);
})
    .catch(function (err) {
        console.error('Error: '+ err);
    });
ipDecodePromise.then(function (res) {
    return writeFileAsync('ipdecode.txt', res);
}).then(function () {
    console.log('file writed done');
}).catch(function (err) {
    console.log('Error: ' + err);
});

//#Task 4

function wait(millisecond){
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + millisecond);
}

var arr = [1,2,3,4,5,6,7,8,9,10];
console.time('blocking');
arr.map(function (item) {
    wait(1000);
    console.log(item + ' * 2 = ', item * 2);

});
console.timeEnd('blocking');
console.time('non-blocking');

promise.map(arr, function (item) {
    wait(1000);
    console.log(item + ' * 2 = ', item * 2);

});
console.timeEnd('non-blocking');

//#Task 5:

var readFileAsync = promise.promisify(fs.readFile);
promise.resolve().then(function () {
    return [readFileAsync('test.json'), readFileAsync('test.json')];
}).spread(function (file1, file2) {
    if(file1 === file2){
        console.log('file1 and file 2 are equal');
    }else{
        console.log('file1 and file2 aren\'t equal');
    }
}).catch(function (err) {
    console.error('Error: ', err);
});

//#Task 6:


