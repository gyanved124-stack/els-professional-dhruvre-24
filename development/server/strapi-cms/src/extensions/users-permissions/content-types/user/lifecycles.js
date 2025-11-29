const getAbly = require("../../../../utils/ably");

module.exports = {
  async afterUpdate(event) {
    const client = getAbly();
    if (!client) {
      return;
    }
    const { result, params } = event;
    const updatedBy = params?.data?.updatedBy ?? null;

    const directoryChannel = client.channels.get("users:updates");
    await directoryChannel.publish("user-status-changed", {
      user: {
        userId: result.id,
        status: result.user_status,
        role: result.user_role,
        updatedBy,
      },
    });

    const personalChannel = client.channels.get(`user:user-${result.id}`);
    await personalChannel.publish("your-status-changed", {
      userId: result.id,
    });
  },
};
