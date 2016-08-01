var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var open = require('open');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(9090, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  open("http://localhost:9090/index.html", "firefox");    
  console.log('Listening at http://localhost:9090/');
});
