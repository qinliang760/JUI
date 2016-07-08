

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
        loader: 'jsx?harmony'//To enable ES6 features, use `?harmony` in your loader config      
      }
    ]
  }  
};