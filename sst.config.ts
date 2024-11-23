/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "weather-timmo-dev",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: process.env.AWS_REGION!,
        },
        cloudflare: {},
      },
    };
  },
  async run() {
    const domain =
      $app.stage === "production"
        ? "forecast.timmo.dev"
        : `${$app.stage}.forecast.timmo.dev`;

    new sst.aws.Nextjs("WeatherApp", {
      domain: {
        name: domain,
        dns: sst.cloudflare.dns(),
      },
      environment: {
        // Tomorrow.io
        WEATHER_API_KEY: process.env.WEATHER_API_KEY!,
        // Sentry
        SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN!,
        // Posthog
        NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY!,
        NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
      },
    });
  },
});
