import { app } from "./src/app.js";

import conf from "./src/conf.js";

const ServerPORT = conf.PORT || 3000;
// console.log(conf.PORT, conf.HUBSPOT_API_KEY);

const startServer = async () => {
  try {
    app.listen(ServerPORT, () => {
      console.log(`⚙️ Server is running at port: ${ServerPORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();
