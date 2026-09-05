import serverConfig from "@/config/server.config";
import { Queue } from "bullmq";

export default new Queue('mailQueue',{
    connection:{
        host: serverConfig.REDIS_HOST,
        port: serverConfig.REDIS_PORT,
    }
});