const path = require('path');

module.exports = {
  entry: {
    tetris: './src/js/tetris.js',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      },
    ]
  }
};
