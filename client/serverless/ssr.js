// serverless/ssr.js

const express = require("express");
const React = require("react");
const { renderToString } = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");
const App = require("../src/App"); // Path to your React app
const template = require("../public/index.html"); // HTML template

const app = express();

app.get("*", (req, res) => {
  const context = {};
  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res.send(template({ html }));
  }
});

module.exports = app;
