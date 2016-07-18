var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry:[
    'webpack-dev-server/client?http://localhost:9090',//资源服务器地址
    'webpack/hot/only-dev-server',
    './src/es6/a'    
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/static/",
    filename: 'bundle-es6.js'
  },
  plugins:[
    //new webpack.DefinePlugin({
    //    'process.env.NODE_ENV': '"development"'
    //}),
    new webpack.HotModuleReplacementPlugin()    
  ],  
  module:{ 
    loaders: [
      {
        test: /\.js$/, 
        //loader: 'jsx?harmony'//To enable ES6 features, use `?harmony` in your loader config      
        //loaders: ['react-hot', 'jsx?harmony'], include: path.join(__dirname, 'src')
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'], 
        include: path.join(__dirname, 'src')
      }
    ]
  }   
};