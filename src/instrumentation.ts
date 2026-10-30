import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";

import { observabilityConfig } from "./config/observability.config";

const sdk = new NodeSDK({
    serviceName: observabilityConfig.service.name,

    ...(observabilityConfig.tracing.enabled && {
        traceExporter: new OTLPTraceExporter({
            url: `${observabilityConfig.tracing.exporterEndpoint}/v1/traces`,
        }),
    }),

    ...(observabilityConfig.metrics.enabled && {
        metricReaders: [
            new PeriodicExportingMetricReader({
                exporter: new OTLPMetricExporter({
                    url: `${observabilityConfig.tracing.exporterEndpoint}/v1/metrics`,
                }),
                exportIntervalMillis: 10000,
            }),
        ],
    }),

    ...(observabilityConfig.logs.enabled && {
        logRecordProcessors: [
            new BatchLogRecordProcessor({
                exporter: new OTLPLogExporter({
                    url: `${observabilityConfig.tracing.exporterEndpoint}/v1/logs`,
                }),
            }),
        ],
    }),

    instrumentations: [
        getNodeAutoInstrumentations({
            // Disabled: noisy, not useful for this project
            "@opentelemetry/instrumentation-fs": {
                enabled: false,
            },
            // Disabled: we use OpenTelemetryTransportV3 in logger.config.ts instead.
            // Leaving both active causes every log to be shipped twice to Loki.
            "@opentelemetry/instrumentation-winston": {
                enabled: false,
            },
        }),
    ],
});

sdk.start();

process.on("SIGTERM", () => {
    sdk.shutdown()
        .then(() => console.log("OpenTelemetry terminated successfully"))
        .catch((error) => console.error("Error shutting down OpenTelemetry", error))
        .finally(() => process.exit(0));
});

export default sdk;
