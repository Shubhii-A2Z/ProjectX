import winston from 'winston';
import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PROD = NODE_ENV === 'production';
const LOG_LEVEL = process.env.LOG_LEVEL || (IS_PROD ? 'info' : 'debug');
const SERVICE_NAME = process.env.SERVICE_NAME || 'relay-backend';

// 1. Clean console format for local development
const consoleFormat = combine(
    colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(({ timestamp, level, message, ...meta }) => {
        const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] ${level}: ${message}${extra}`;
    })
);

// 2. Production JSON format for Logstash & Elasticsearch (ECS compliant)
const fileFormat = combine(
    timestamp(),
    errors({ stack: true }),
    json()
);

// Helper for rotating file transports by severity level
const createRotateTransport = (level: string) =>
    new DailyRotateFile({
        dirname: 'logs',
        filename: `${level}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        level,
        maxFiles: IS_PROD ? '14d' : '3d',
        maxSize: '20m',
        zippedArchive: false,
        format: fileFormat,
    });

// 3. Logger instance
const logger = winston.createLogger({
    level: LOG_LEVEL,
    defaultMeta: {
        service: SERVICE_NAME,
        env: NODE_ENV,
    },
    transports: [
        // Terminal output
        new winston.transports.Console({
            format: consoleFormat,
            silent: NODE_ENV === 'test',
        }),

        // OpenTelemetry Transport -> forwards logs to OTLP collector & Loki
        new OpenTelemetryTransportV3(),

        // File outputs split by severity level
        createRotateTransport('info'),  // captures info, warn, error
        createRotateTransport('warn'),  // captures warn, error
        createRotateTransport('error'), // captures error only
    ],
    exitOnError: false,
});

export default logger;