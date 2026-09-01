import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import serverConfig from "@/config/server.config";

const connectionString=serverConfig.DATABASE_URL;

const adapter=new PrismaNeon({connectionString});
const prismaClient=new PrismaClient({adapter});

const prisma=prismaClient.$extends({
  query: {
    user: {
      async create({ args, query }) {
        if (!args.data.avatar && args.data.username) {
          args.data.avatar =
            `https://robohash.org/${args.data.username}`;
        }

        return query(args);
      },
    },
  },
});

export default prisma;

