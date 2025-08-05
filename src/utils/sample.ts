export const getHtmlSample = async () => {
  return await fetch("./sample/sample.html")
    .then((response) => response.text())
    .then((text) => {
      return text;
    });
};

export const getSvgSample = async () => {
  return await fetch("./public/images/logo.svg")
    .then((response) => response.text())
    .then((text) => {
      return text;
    });
};

export const getJsSample = async () => {
  return await fetch("./sample/hi_mom.js")
    .then((response) => response.text())
    .then((text) => {
      return text;
    });
};
