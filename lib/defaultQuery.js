module.exports = function defaultQuery() {
    return {
        'SignatureMethod':  'HmacSHA256',
        'SignatureVersion': '2',
        'Version':          '2011-10-01' 
    };
}
