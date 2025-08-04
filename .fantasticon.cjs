const { FontAssetType, OtherAssetType } = require("fantasticon");

module.exports = {
  inputDir: "./public/images/icons/",
  outputDir: "./public/fonts",
  fontTypes: [FontAssetType.TTF, FontAssetType.WOFF, FontAssetType.WOFF2],
  assetTypes: [OtherAssetType.JSON, OtherAssetType.SCSS],
  fontsUrl: "/fonts",
  formatOptions: {
    svg: {
      metadata: {
        Company: "Griffin Web Studio Limited",
      },
    },
    json: {
      indent: 2,
    },
  },
  pathOptions: {
    json: "./public/fonts/icon.json",
    scss: "./src/sass/base/_icons.scss",
  },
  fontHeight: 600,
  descent: 40,
  normalize: true,
  tag: "",
  prefix: "icon",
  templates: {
    scss: "./src/assets/scss.hbs",
  },
};
