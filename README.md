# tzlocator

> Lightweight privacy respecting geolocation library with no dependencies.

## Key features

-   🥂 No subscription (unlike GeoIP)
-   👀 Works without browser prompt
-   🌏 Country and currency data
-   🔒 Privacy respecting
-   🪶 Lightweight with no dependencies
-   🎓 Fully typed

## Installation

```ts
// npm
npm install geotimezone
// yarn
yarn add geotimezone
// pnpm
pnpm add geotimezone
```

## Usage

-   Star the [github repo](https://github.com/geotimezone/geotimezone) 😎

### Browser

#### Single page application

```ts
import { geotimezone } from "geotimezone"
// returns the browser's timezone, e.g. "Europe/London"
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const timezoneData = geotimezone.get(timezone)
```

#### Server side rendering

```ts
// returns the browser's timezone, e.g. "Europe/London"
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
document.cookie = `timezone=${timezone};`
```

### Server

```ts
import { geotimezone } from "geotimezone"
// assuming you sent the browser's timezone in the cookie header
function getTimezoneData(request: Request) {
	const cookies = getRequestCookies(request)
	return geotimezone.get(cookies.timezone)
}
```

## Contributing

1.  Dynamically import `geotimezone.json` and make its instanciation (currently `geotimezone`) a function.
2.  Create a `getBrowserTimezone` utility function to replace `Intl.DateTimeFormat().resolvedOptions().timeZone`.

## Thanks

-   [Tiago de Almeida](https://gist.github.com/tiagodealmeida/0b97ccf117252d742dddf098bc6cc58a)
-   [IANA](https://data.iana.org/time-zones/releases/)
-   [Mutually Human](https://github.com/mhs/world-currencies/blob/master/currencies.json)
