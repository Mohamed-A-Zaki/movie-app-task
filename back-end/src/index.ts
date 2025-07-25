import connectToDatabase from "./utils/connect-to-database";
import startApplication from "./utils/startApplication";

import "./utils/config";
import "./utils/middlewares";

connectToDatabase();
startApplication();
