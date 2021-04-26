const { v4: uuidv4 } = require('uuid');
const db = require('./db')

class Topics {
  constructor() {
    this.subscriptions = db.get("subscriptions");

    return {
      subscriptions: this.subscriptions,
      createSubscription: this.createSubscription,
    };
  }

  createSubscription = (subscriptions) => {
    const id = uuidv4();
    this.subscriptions
      .push({
        id,
        url: subscriptions.url,
        topic: subscriptions.topic,
      })
      .write();

    return this.subscriptions
      .find({
        id,
      })
      .value();
  };
}



module.exports= Topics;