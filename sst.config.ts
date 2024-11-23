/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "forecast-timmo-dev",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "eu-west-2",
        },
        cloudflare: {},
      },
    };
  },
  console: {
    autodeploy: {
      target(event) {
        if (event.type === "branch" && event.action === "pushed") {
          switch (event.branch) {
            case "main":
              return {
                stage: "production",
                runner: { engine: "codebuild", compute: "large" },
              };
            case "dev":
              return {
                stage: "development",
                runner: { engine: "codebuild", compute: "large" },
              };
            default:
              throw new Error(`Unsupported branch: ${event.branch}`);
          }
        }
      },
    },
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
    });
  },
});
