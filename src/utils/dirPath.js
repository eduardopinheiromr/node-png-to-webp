const appRoot = require("app-root-path");

const dirPath = (folder) => appRoot + folder;

module.exports = dirPath;
