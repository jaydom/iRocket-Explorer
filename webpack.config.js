module.exports = {
    entry: [
        './public/assets/js/entry.js'
    ],
    output: {
        path: __dirname + '/public/assets/',
        publicPath: "/public/assets/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['jsx-loader?harmony'] }
        ]
    }
};