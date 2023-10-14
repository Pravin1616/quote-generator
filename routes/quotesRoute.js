const express = require("express");
const router = express.Router();

const { quotes } = require("../data");
const { getRandomElement } = require("../utils");

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

module.exports = router;
