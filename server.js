const express = require("express");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const routes = require("./routes");

const cors = require("cors");

const dbOption = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "library",
};

const app = express();

app.set("port", process.env.PORT || 9000);

app.use(cors("*"));

app.use(myconn(mysql, dbOption, "single"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

app.use("/api", routes);

app.listen(app.get("port"), () => {
  console.log(`http://localhost`, app.get("port"));
});
