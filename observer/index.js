const apiCall = require("axios");
const TopicService = require("../service");

const topicService = new TopicService();

const publishTopic = async (url, topic, data) => {
  try {
    const results = await apiCall.post(url, { topic, data });
    const { status, data: resData } = results;

    return {
      status,
      url,
      resData,
    };
  } catch (error) {
    return error;
  }
};

const processSubscription = (url, topic, timestamp) => {
  const subscriptions = {
    url,
    topic,
    timestamp,
  };
  return topicService.createSubscription(subscriptions);
};

const processPublishing = async (
  publishId,
  topic,
  data,
  subscribers,
  timestamp,res
) => {
  try {
    const subscriberServerUrlList = subscribers.map((subs) => subs.url);

    const results = await Promise.allSettled(
      subscriberServerUrlList.map(async (url) => {
        return await publishTopic(url, topic, data);
      })
    );

    const rejected = results
      .filter(
        (promised) =>
          promised.status === "rejected" || promised.value instanceof Error
      )
      .map((fail) => {
        const { config, response } = fail.value;
        return {
          url: config.url,
          status: response.status,
          message: response.statusText,
        };
      });

    const success = results
      .filter(
        (promised) =>
          promised.status === "fulfilled" && !(promised.value instanceof Error)
      )
      .map((suc) => {
        const { status, url } = suc.value;
        return { status, url };
      });

    const feedbackData = {
      id: publishId,
      topic,
      data,
      success,
      fail: rejected,
      status: rejected.length === 0 && success.length===0?'No subscribers for the topic':rejected.length > 0 ? "uncompleted" : "completed" ,
      timestamp,
    };
    console.log('feedback', feedbackData)
    return topicService.createNotification(feedbackData);
  } catch (error) {
    return error;
  }
};

module.exports = {
  processSubscription,
  processPublishing,
};