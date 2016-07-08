

module.exports = {
  entry:[
    './a.js'
  ],
  output: {
    path: __dirname,
    //publicPath: "/assets/",
    filename: 'assets/bundle.js'
  },
  module:{ 
    loaders: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel',
        query:{
          presets:['react']
        }        
      }
    ]
  }  
};