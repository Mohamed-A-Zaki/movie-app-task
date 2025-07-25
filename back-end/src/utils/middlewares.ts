import errorHandler from "../middleware/error-handler";
import notFoundHandler from "../middleware/not-found-handler";
import entryRouter from "../modules/entities/entry-routes";
import userRouter from "../modules/users/user-routes";
import app from "./app";
import routes from "./routes";

app.use(routes.entries, entryRouter);
app.use(routes.auth, userRouter);

app.use(notFoundHandler);

app.use(errorHandler);
