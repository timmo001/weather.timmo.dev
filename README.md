# weather.timmo.dev

A web application that displays the current weather and forecast for a given location.

Weather data is provided by the [Tomorrow.io](https://www.tomorrow.io/) API. Their weather data sources can be found [here](https://app.tomorrow.io/tomorrow-data-sources).

## Features

- Set your location using coordinates. You can use your browser's geolocation feature to get your current location.
- Get the current weather conditions.
- Get a 6 day forecast either in hourly or daily intervals.
- Dark and light themes - uses your browser's theme preference as the default theme.
- Responsive design.
- Progressive Web App support - You can install the web app as a standalone app on your device using the install prompt or the install button in your browser's address bar.

## Screenshots

[![Homepage (Dark)](https://raw.githubusercontent.com/timmo001/weather.timmo.dev/master/resources/home-dark.png)](https://weather.timmo.dev)
[![Hourly (Dark)](https://raw.githubusercontent.com/timmo001/weather.timmo.dev/master/resources/hourly-dark.png)](https://weather.timmo.dev/hourly)
[![Daily (Dark)](https://raw.githubusercontent.com/timmo001/weather.timmo.dev/master/resources/daily-dark.png)](https://weather.timmo.dev/daily)
[![Homepage (Light)](https://raw.githubusercontent.com/timmo001/weather.timmo.dev/master/resources/home-dark.png)](https://weather.timmo.dev)

## Why Tomorrow.io?

There were a few options for weather data providers, but I chose Tomorrow.io for the following reasons:

- The free tier is generous and allows for a good amount of requests per day. The hourly was an issue, but was alleviated thanks to the support team. See [here](https://github.com/timmo001/weather.timmo.dev/discussions/21) for more on this.
- The API provides realtime data allowing for up to date weather information.
- Tomorrow.io uses a range of data sources to provide accurate weather data. You can see the data sources [here](https://app.tomorrow.io/tomorrow-data-sources).
- Only one request is needed to get the current weather data. Forecast data is also one request, but can be split into hourly or daily intervals via query parameters.

### Alternatives Considered

- [Accuweather](https://github.com/timmo001/weather.timmo.dev/tree/accuweather) - After hitting an hourly limit with tomorrow.io, I had used them before and they have accurate data. However, the free tier is limited to 50 requests per day.
- [OpenWeatherMap](https://openweathermap.org) - I have used OpenWeatherMap in the past and they have a generous free tier. However, I wanted to try a newer provider.
- [Open-Meteo](https://open-meteo.com) - I have not used Open-Meteo before, but they have a generous free tier at 10,000 requests a day for non-commercial use. I may consider them in the future if I find the data to be accurate.

## Development

### Prerequisites

- [Node.js](https://nodejs.org)
- [Bun](https://bun.sh) (Optional, but recommended)

You can also use `yarn` or `pnpm` as an alternative if you prefer. The below instructions are for `bun`, but are interchangeable.

### Setup

1. Clone the repository.
2. Copy the .env.example file and populate the values.
3. Install the dependencies.

```sh
bun install
```

4. Start the development server.

```sh
bun run dev
```

5. Open the application in your browser at `http://localhost:3000`.

### Building

To build the application for production, run the following command:

```sh
bun run build
```

### Deployment

This application is deployed using [Vercel](https://vercel.com). You can deploy it to your own Vercel account by clicking the button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftimmo001%2Fweather.timmo.dev&env=WEATHER_API_KEY&envDescription=Your%20API%20key%20from%20tomorrow.io&project-name=my-weather-app&repository-name=my-weather-app)

You can also deploy it any other platform of your choice that supports Next.js applications.
