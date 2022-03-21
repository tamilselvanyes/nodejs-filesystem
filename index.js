import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { writeFile, readdir } from "fs";

const app = express();
dotenv.config();

//middleware --> Intercept --> Body to JSON
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", function (req, res) {
  res.send(
    "Welcome...This is an API for creating and reading Files \n 1.For creating files append /createfiles  \n 2.For reading the Files in the folder append /readfiles"
  );
});

app.listen(PORT, () => console.log(`Server started ${PORT}`));

app.get("/createfiles", function (req, res) {
  //variables to get the current date-time stamp
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let file_name = today.toString().replace(/ /g, "").replace(/:/g, "");
  let text = time;
  console.log("file_name" + file_name);
  // Inorder to avoid too many file creation checking the files length
  readdir("./files", (err, files) => {
    if (files.length > 20) {
      res.send("Too many files created");
    } else {
      //creating the file
      writeFile(`./files/${file_name}.txt`, text, (err) =>
        console.log("Complete writing")
      );
      res.send(
        `File created successfully with name ${file_name} and content ${text}`
      );
    }
  });
});

//reading the directory
app.get("/readfiles", function (req, res) {
  readdir("./files", (err, files) => {
    res.send(files.join("\n"));
  });
});
