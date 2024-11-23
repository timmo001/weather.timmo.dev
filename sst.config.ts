/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "forecast-timmo-dev",
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

    new sst.aws.Nextjs("WeatherTimmoDevApp", {
      domain: {
        name: domain,
        dns: sst.cloudflare.dns(),
      },
      environment: {
        // AWS
        AWS_REGION: process.env.AWS_REGION!,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
        // Cloudflare
        CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN!,
        CLOUDFLARE_DEFAULT_ACCOUNT_ID: process.env.CLOUDFLARE_DEFAULT_ACCOUNT_ID!,
        // Tomorrow.io
        WEATHER_API_KEY: process.env.WEATHER_API_KEY!,
        // Sentry
        SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN!,
        // Posthog
        NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY!,
        NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST!,

    });
  },
});
