const cron = require("node-cron");
const Auction = require("../models/Auction");

cron.schedule("* * * * *", async () => {

  try {

    const now = new Date();

    const result = await Auction.deleteMany({
      endTime: { $lt: now }
    });

    console.log(`${result.deletedCount} expired auctions deleted`);

  } catch (err) {

    console.log(err);

  }

});