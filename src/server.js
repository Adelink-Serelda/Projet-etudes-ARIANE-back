import { initApp } from "./app.js";
import chalk from "chalk";

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    const app = await initApp();
    await app.listen(port, () => {
      console.log(`Le serveur est démarré sur http://localhost:${port}`);
    });
    console.log(chalk.bgGreenBright(`API ready on http://localhost:${port}`));
  } catch (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }
};

start();
