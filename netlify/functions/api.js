const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = require("../../routes/quotesRoute");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));
app.use("/.netlify/functions/api", router);

app.listen(PORT, () => {
  console.log(`Server listening on PORT:${PORT}`);
});

exports.handler = serverless(app);
