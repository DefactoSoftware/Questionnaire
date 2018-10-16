module.exports = {
  ident: "postcss",
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    "postcss-preset-env": {
      stage: 0,
      browsers: "last 2 versions"
    },
    cssnano: {}
  }
};
