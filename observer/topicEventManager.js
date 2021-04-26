const EventEmitter = require("events");
const TopicService = require('../service')

const topicService = new TopicService();

class TopicEventManager extends EventEmitter {
  constructor() {
    super();
  }

  subscribe(url, topic) {
    const existSubscription = topicService.findExistingSubscriptions({
      url,
      topic,
    });
    if (existSubscription) {
      this.emit("error", new Error("Existing subscriptions already exist"));
      return;
    }
    this.emit("subscribe", url, topic, Date.now());
  }

  publish(publishId, topic, data) {
    const subscribers = topicService.findSubscribers({ topic });

    this.emit("publish", publishId, topic, data, subscribers, Date.now());
  }
}

module.exports = TopicEventManager;