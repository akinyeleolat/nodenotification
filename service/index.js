const { v4: uuidv4 } = require('uuid');
const db = require('../db')

class TopicService {
  constructor() {
    this.subscriptions = db.get("subscriptions");
    this.notifications = db.get("notifications");

    return {
      subscriptions: this.subscriptions,
      notifications: this.notifications,
      createSubscription: this.createSubscription,
      findExistingSubscriptions: this.findExistingSubscriptions,
      findSubscribers: this.findSubscribers,
      createNotification: this.createNotification,
      findNotification: this.findNotification
    };
  }

  createSubscription = (subscriptions) => {
    const id = uuidv4();
    return this.subscriptions
      .push({
        id,
        url: subscriptions.url,
        topic: subscriptions.topic,
        createdAt: subscriptions.timestamp,
      })
      .write();
  };

  findExistingSubscriptions = (subscriptions) => {
    return this.subscriptions
      .find({
        url: subscriptions.url,
        topic: subscriptions.topic,
      })
      .value();
  };

  findSubscribers = (subscriptions) => {
    return this.subscriptions.value().filter(sub=> sub.topic === subscriptions.topic);
  };

  createNotification = (notifications) => {
    return this.notifications
      .push({
        id: notifications.id,
        topic: notifications.topic,
        data: notifications.data,
        fail: notifications.fail,
        success: notifications.success,
        status: notifications.status,
        createdAt: notifications.timestamp,
      })
      .write();
  };

  findNotification = (notification) => {
    return this.notifications
      .find({
        id: notification.id
      })
      .value();
  };

}



module.exports= TopicService;