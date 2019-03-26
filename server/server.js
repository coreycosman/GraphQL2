const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const path = require("path");

const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/graphQLBackendAPI", {
    useNewUrlParser: true
  })
  .catch(e => {
    console.log("mongo connection error: try running mongod");
  });

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
