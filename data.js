const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/quotes")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("could not connect to MongoDB: ", e);
  });

const quotesSchema = new mongoose.Schema({
  quote: String,
  person: String,
});

const Quotes = mongoose.model("quotes", quotesSchema);

// Export an asynchronous function to fetch quotes
async function fetchQuotes() {
  const quotes = await Quotes.find();
  return quotes;
}

// Export an asynchronous function to create a quote to db
async function createQuote(quote, person) {
  const quotes = new Quotes({
    quote,
    person,
  });

  const result = await quotes.save();
  return result;
}

module.exports = {
  fetchQuotes,
  createQuote,
};
