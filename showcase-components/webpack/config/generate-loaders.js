function cssLoaders(options = { sourceMap: false }) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  };

  const styleLoader = {
    loader: 'style-loader',
    options: {
      insertAt: 'top',
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      plugins:  [require('autoprefixer')({
        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
      })]
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loaderName, loaderOptions) {
    const loaders = [styleLoader, cssLoader, postcssLoader];
    if (loaderName) {
      loaders.push({
        loader: loaderName + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    return loaders;
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
}

// Generate loaders for standalone style files (outside of .vue)
module.exports = {
  styleLoaders: function(options) {
    const output = [];
    const loaders = cssLoaders(options);
    for (const ext in loaders) {
      const loader = loaders[ext];
      output.push({
        test: new RegExp('\\.' + ext + '$'),
        use: loader
      });
    }
    return output;
  }
};
