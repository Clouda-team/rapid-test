var config = {
    host: '127.0.0.1',
    port: 8080
};
var http = require('http'),
    assert = require('assert'),
    fs = require('fs');
describe('fork http server', function () {
    process.argv = ['node', fs.realpathSync('test-http.js')];
    require('../test-http');
    console.log('ROOT_DIR');
    it('delay for http ready', function (next) {
        function retry() {
            request({
                path: '/'
            }, function () {
                next();
            }, true).on('error', retry).end();
        }

        retry();
    });
});

describe('static resource', function () {
    it('/', function (next) {
        request({
            path: '/'
        }, function (buf) {
            assert.bufferEqual(buf, read('app/index.html'));
            next();
        }).end();
    });

    it('/get_img', function (next) {
        request({
            path: '/get_img'
        }, function (buf) {
            assert.bufferEqual(buf, read('app/img.jpg'));
            next();
        }).end();
    });
});

describe('redirect', function () {
    it('location', function (next) {
        var url = 'http://www.taobao.com';
        request({
            path: '/redirect?to=' + encodeURIComponent(url)
        }, function (res) {
            assert.strictEqual(res.headers.location, url);
            next();
        }, true).end();
    });

    it('/forward', function (next) {
        request({
            path: '/forward'
        }, function (buf) {
            assert.bufferEqual(buf, read('app/img.jpg'));
            next();
        }).end();
    });
});


describe('error', function () {
    // TODO
});


describe('cookie', function () {
    it('set-cookie', function (next) {
        request({
            path: '/testcookie', headers: {
                'Cookie': 'a=123; b=1406284659566'
            }
        }, function (tres) {
            assert.deepEqual(tres.headers['set-cookie'][0], 'a=124');
            assert(tres.headers['set-cookie'][1].match(/^b=\d+$/));
            next();
        }, true).end();
    });

    it('remove cookie', function (next) {
        request({
            path: '/removecookie', headers: {
                'Cookie': 'a=123; b=1406284659566'
            }
        }, function (tres) {
            assert(/^a=null; /.test(tres.headers['set-cookie'][0]));
            assert(/^b=null; /.test(tres.headers['set-cookie'][1]));
            next();
        }, true).end();
    });
});


function read(file) {
    return fs.readFileSync(file);
}

function readText(file) {
    return fs.readFileSync(file, 'utf8');
}

function request(options, cb, tres) {
    options.host = config.host;
    options.port = config.port;
    console.log(options);
    return http.request(options, tres ? cb : function (tres) {
        var chunks = [];
        tres.on('data', chunks.push.bind(chunks)).on('end', function () {
            cb(Buffer.concat(chunks));
        });
    });
}

assert.bufferEqual = function (expected, actual) {
    for (var i = 0, L = actual.length; i < L; i++) {
        if (actual[i] !== expected[i]) {
            throw new Error('AssertionError: buffer not equal at ' + i + ': expected: 0x' + expected[i].toString(16) + ', actual: 0x' + actual[i].toString(16));
        }
    }
};