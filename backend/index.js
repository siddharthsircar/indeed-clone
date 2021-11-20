import mongoInit from "./src/db/config/mongo.init.js";
import app from "./app.js";
import testRouter from "./src/modules/test/router/test.js";
import kafkaTestRouter from "./src/modules/kafka-test/router/kafkaTestRouter.js";

mongoInit();

app.use(testRouter);
app.use(kafkaTestRouter);
