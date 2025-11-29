const Ably = require("ably");

let client;

module.exports = () => {
  if (!process.env.ABLY_API_KEY) {
    // `strapi` may not be available in all contexts (tests, scripts). Fall back to console.
    if (
      typeof strapi !== "undefined" &&
      strapi.log &&
      typeof strapi.log.warn === "function"
    ) {
      strapi.log.warn("ABLY_API_KEY missing; realtime updates disabled.");
    } else {
      // eslint-disable-next-line no-console
      console.warn("ABLY_API_KEY missing; realtime updates disabled.");
    }

    return null;
  }

  if (!client) {
    // Use the Realtime constructor and the correct option name `echoMessages`.
    // Avoid using `.Promise` on the constructor (not present on newer SDKs).
    client = new Ably.Realtime({
      key: process.env.ABLY_API_KEY,
      echoMessages: false,
    });
  }

  return client;
};
