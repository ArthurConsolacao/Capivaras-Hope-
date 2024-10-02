const express = require("express");
const router = require("./router");
const path = require("path");

const app = express();
app.use(express.json());
app.use(router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;
