import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import serverConfig from "@/config/server.config";

const connectionString=serverConfig.DATABASE_URL;

const adapter=new PrismaNeon({connectionString});
const prismaClient=new PrismaClient({adapter});

export default prismaClient;

