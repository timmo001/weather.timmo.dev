# weather.timmo.dev

A web application that displays the current weather and forecast for a given location.

Weather data is provided by the [Tomorrow.io](https://www.tomorrow.io/) API.

## Features

- Set your location using coordinates. You can use your browser's geolocation feature to get your current location.
- Get the current weather conditions.
  - Temperature
- Get a 6 day forecast either in hourly or daily intervals.
- Dark and light themes.
  - Uses your browser's theme preference as the default theme.
- Responsive design.
- Progressive Web App support - You can install the web app as a standalone app on your device using the install prompt or the install button in your browser's address bar.

## Development

### Prerequisites

- [Node.js](https://nodejs.org)
- [Bun](https://bun.sh) (Optional, but recommended)

You can also use `yarn` or `pnpm` as an alternative if you prefer. The below instructions are for `bun` but are interchangeable.

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
