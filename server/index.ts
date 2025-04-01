import { config } from "./infrastructure/config/env.config";
import { startServer } from "./infrastructure/express-server/app";

const initializeServer = async () => {
  try {
    const app = startServer();
    const port = config.port;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error);
    process.exit(1);
  }
};

initializeServer();
