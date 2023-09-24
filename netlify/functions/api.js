const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

const { quotes } = require("../../data");
const { getRandomElement } = require("../../utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));
app.use("/.netlify/functions/api", router);

router.get("/quotes/random", (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.status(200).send({ quote: quote });
});

router.get("/quotes", (req, res, next) => {
  if (req.query.person) {
    const author = req.query.person;
    const result = quotes.filter((quote) => {
      return quote["person"] === author;
    });
    if (result.length > 0) {
      res.status(200).send({ quotes: result });
    } else {
      res.status(200).send({ quotes: [] });
    }
  } else {
    res.status(200).send({ quotes: quotes });
  }
});

router.post("/quotes", (req, res, next) => {
  if (req.query.quote && req.query.person) {
    const newQuote = {
      quote: req.query.quote,
      person: req.query.person,
    };
    quotes.push(newQuote);
    res.status(200).send({ quote: newQuote });
  } else {
    res.status(400);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT:${PORT}`);
});

exports.handler = serverless(app);
