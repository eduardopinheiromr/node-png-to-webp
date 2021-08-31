const fs = require("fs");
const path = require("path");
const dirPath = require("./dirPath");

const cleanOldFiles = (directory = "/uploads", lifetime = 3600000) => {
  const directoryPath = dirPath(directory);

  fs.readdir(directoryPath, (err, files) => {
    if (err || files.length === 0) {
      console.log("No files to exclude");
      return;
    }

    files.forEach((file) => {
      fs.stat(path.join(directoryPath, file), (err, stat) => {
        var endTime, now;
        if (err) {
          return console.error(err);
        }
        now = new Date().getTime();
        endTime = new Date(stat.ctime).getTime() + lifetime;
        if (now > endTime) {
          return fs.rmSync(path.join(directoryPath, file));
        }
      });
    });
  });
};

module.exports = cleanOldFiles;
