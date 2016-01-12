var promise = require('bluebird');
var fs = require('fs');
var request = require('request')

//var readFileAsync = promise.promisify(fs.readFile);
//
//promise.all([readFileAsync('test.json'), readFileAsync('test.json')])
//    .then(function (files) {
//        console.log(files[0].toString(), files[1].toString());
//    }).catch(function (err) {
//    console.error("Error: ", err);
//});

var photoLink = [
    {
        link: 'https://unsplash.imgix.net/photo-1425235024244-b0e56d3cf907?fit=crop&fm=jpg&h=700&q=75&w=1050',
        name: 'dog.jpg'
    },
    {
        link: 'https://unsplash.imgix.net/reserve/NxxLccbqQdGtNc7xJ43e_ancestral-home.jpg?fit=crop&fm=jpg&h=600&q=75&w=1050',
        name: 'house.jpg'
    },
    {
        link: 'https://unsplash.imgix.net/photo-1423439793616-f2aa4356b37e?q=75&fm=jpg&s=3b42f9c018b2712544debf4d6a4998ff',
        name: 'car.jpg'
    },
    {
        link: 'https://unsplash.imgix.net/photo-1422513391413-ddd4f2ce3340?q=75&fm=jpg&s=282e5978de17d6cd2280888d16f06f04',
        name: 'nightstar.jpg'
    }
];
function getPhoto(photoLink){
    return new promise (function (fullfill, reject) {
        request.get(photoLink.link)
            .on('error', function (err) {
                reject(err);
            })
            .pipe(fs.createWriteStream(photoLink.name)
                .on('finish', function () {
                    fullfill(photoLink.name);
                })
                .on('error', function (err) {
                    reject(err);
                }))
    });
}
console.time('getphoto');
promise.map(photoLink, function (items) {
    return getPhoto(items).then(function (res) {
        console.log(new Date().toLocaleTimeString().replace(/T/, ' ').replace(/\..+/, '')+' '+res);
        return res;
    });
}, {concurrency: 6}).then(function (res) {
    console.log(res);
    console.timeEnd('getphoto');

}).catch(function (err) {
    console.error('Error: ', err);
});