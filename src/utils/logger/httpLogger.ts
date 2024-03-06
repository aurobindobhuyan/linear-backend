import morgan from "morgan";
import morganJSON from "morgan-json";
import { logger } from "./logger";

interface HTTPLoggerParams {
  method: string;
  url: string;
  status: string;
  responseTime: string;
}

class HTTPLoggerStream {
  write(message) {
    const data: HTTPLoggerParams = JSON.parse(message);

    if (Number(data.status) >= 400) {
      logger.error(JSON.stringify({ ...data }, null, 2));
    } else if (Number(data.status) >= 300 && Number(data.status) < 400) {
      logger.warn(JSON.stringify({ ...data }, null, 2));
    } else {
      logger.info(JSON.stringify({ ...data }, null, 2));
    }
  }
}

export default (app) => {
  const httpLoggerParams: HTTPLoggerParams = {
    method: ":method",
    url: ":url",
    status: ":status",
    responseTime: ":response-time",
  };

  const format = morganJSON(httpLoggerParams);

  app.use(
    morgan(format, {
      stream: new HTTPLoggerStream(),
    })
  );
};
