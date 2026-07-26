import serverless from "serverless-http";
import app from "../../server/src/app.js";
import connectDatabase from "../../server/src/config/database.js";

let isConnected = false;

const serverlessApp = serverless(app);

export const handler = async (event: any, context: any) => {
  if (!isConnected) {
    await connectDatabase();
    isConnected = true;
  }

  return serverlessApp(event, context);
};