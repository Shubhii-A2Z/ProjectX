import Redis from "ioredis";
import Redlock from "redlock";

export const redisClient=new Redis({
    host: 'localhost',
    port: 6379,
});

export const redLock=new Redlock([redisClient as any],{
        retryCount: -1, // retry forever until acquired
        retryDelay: 200, // ms between attempts
        retryJitter: 200
    }
);