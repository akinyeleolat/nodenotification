const express = require("express");
const bodyParser = require("body-parser");

const logger = require("./utils/Logger");

const app = express();

const port = 9000;

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/test1", (req, res) => {
  logger.info(`notification received  on test 1. ${JSON.stringify(req.body)}`);

  return res.status(200).json({
    topic: req.body.topic,
    data: req.body.data,
  });
});

app.post("/test2", (req, res) => {
  logger.info(`notification received on test 2. ${JSON.stringify(req.body)}`);
  return res.status(200).json({
    topic: req.body.topic,
    data: req.body.data,
  });
});

app.listen(port, () => {
  logger.info(`Subscriber server running on port ${port}!`);
  console.log(`Subscriber server running on port ${port}!`);
});
