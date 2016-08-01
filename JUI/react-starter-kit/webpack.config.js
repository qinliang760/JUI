var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry:[
    'webpack-dev-server/client?http://localhost:9090',//资源服务器地址
    'webpack/hot/only-dev-server',
    'D:/svn/carrier/hearthstone/branches/dev/src/main/webapp/js/download'
    //"./src/js/index"    
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: 'index.js'
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()    
  ],  
  module:{ 
    loaders: [
      {
        test: /\.js$/, 
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'], 
        include: path.join("D:/svn/carrier/hearthstone/branches/dev/src/main/webapp/", 'js')
        //include: path.join(__dirname, 'src')
      }
    ]
  }   
};