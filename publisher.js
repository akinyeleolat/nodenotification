const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const observer = require("./observer");
const logger = require("./utils/Logger");
const TopicService = require("./service");

const TopicEventManager = require("./observer/topicEventManager");

const pub = express();

const port = 8000;

const topicEventManager = new TopicEventManager();

const topicService = new TopicService();

// Configuring body parser middleware
pub.use(bodyParser.urlencoded({ extended: false }));
pub.use(bodyParser.json());

pub.post("/subscribe/:topic", (req, res) => {
  try {
    const { url } = req.body;
    const { topic } = req.params;

    topicEventManager.subscribe(url, topic);

    res.status(200).json({
      url,
      topic,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

pub.post("/publish/:topic", async (req, res) => {
  try {
    const publishId = uuidv4();
    const data = req.body;
    const { topic } = req.params;

    topicEventManager.publish(publishId, topic, data);

    res.status(200).json({
      topic,
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

topicEventManager.on("subscribe", observer.processSubscription);

topicEventManager.on("publish", observer.processPublishing);

topicEventManager.on("error", (error) => {
  logger.error(`Gracefully handling our error: ${error}`);
});

logger.info(
  `We now have: ${topicEventManager.listenerCount(
    "subscribe"
  )} listener(s) for the topic subscription event`
);

logger.info(
  `We now have: ${topicEventManager.listenerCount(
    "publish"
  )} listener(s) for the topic publishing event`
);

pub.listen(port, () => {
  logger.info(`Publisher server running on port ${port}!`);
  console.log(`Publisher server running on port ${port}!`);
});
