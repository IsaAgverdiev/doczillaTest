const fs = require("fs");
const path = require("path");

const getFiles = function (dir, files_) {
  files_ = files_ || [];

  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }

  return files_;
};

const sortedData = function (dir) {
  function SortArray(file1, file2) {
    let file1Name = path.basename(file1);
    let file2Name = path.basename(file2);
    return file1Name.localeCompare(file2Name);
  }

  let data = getFiles(dir);
  let dataTxt = [];

  data.forEach((file) => {
    if (path.extname(file) === ".txt") {
      dataTxt.push(file);
    }
  });

  var sordedDataTxt = dataTxt.sort(SortArray);
  return sordedDataTxt;
};

const concatText = function (dir) {
  let data = sortedData(dir);

  let dataFileContent = [];
  data.forEach((file) => {
    let text = fs.readFileSync(file, "utf8");
    dataFileContent.push(text);
  });
  let str = dataFileContent.join("\n");
  fs.writeFile("concatedFile.txt", str, function (error) {
    if (error) throw error;
  });
};

console.log(concatText("./"));
