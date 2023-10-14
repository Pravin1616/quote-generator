const express = require("express");
const router = express.Router();

const quoteModule = require("../data");
const { getRandomElement } = require("../utils");

router.get("/quotes/random", async (req, res, next) => {
  try {
    const quotes = await quoteModule.fetchQuotes();
    const quote = getRandomElement(quotes);
    res.status(200).send({ quote: quote });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).send({ error: "An error occurred while fetching quotes." });
  }
});

router.get("/quotes", async (req, res, next) => {
  try {
    const quotes = await quoteModule.fetchQuotes();
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
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).send({ error: "An error occurred while fetching quotes." });
  }
});

router.post("/quotes", async (req, res, next) => {
  try {
    if (req.body.quote && req.body.person) {
      const newQuote = {
        quote: req.body.quote,
        person: req.body.person,
      };
      const createdQuote = await quoteModule.createQuote(newQuote);

      if (createdQuote) {
        res.status(200).send({ quote: createdQuote });
      } else {
        res.status(500).send({ error: "Failed to create the quote." });
      }
    } else {
      res.status(400).send({
        error: "Invalid request. Both quote and person are required.",
      });
    }
  } catch (error) {
    console.error("Error creating a quote:", error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the quote." });
  }
});

module.exports = router;
