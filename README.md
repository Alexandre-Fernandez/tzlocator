# tzlocator

> Lightweight privacy respecting geolocation library with no dependencies.

## Key features

-   🥂 No third-party API calls
-   👀 Works without browser prompt
-   🪙 No reverse IP lookups
-   🌏 Country and currency data
-   🔒 Privacy respecting
-   🪶 Lightweight with no dependencies
-   🎓 Fully typed

## Installation

```ts
// npm
npm install tzlocator
// yarn
yarn add tzlocator
// pnpm
pnpm add tzlocator
```

## Usage

-   Star the [github repo](https://github.com/tzlocator/tzlocator) 😎

### Browser

#### Single page application

```ts
import { tzlocator } from "tzlocator"
// returns the browser's timezone, e.g. "Europe/London"
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const timezoneData = tzlocator.get(timezone)
```

#### Server side rendering

```ts
// returns the browser's timezone, e.g. "Europe/London"
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
document.cookie = `timezone=${timezone};`
```

### Server

```ts
import { tzlocator } from "tzlocator"
// assuming you sent the browser's timezone in the cookie header
function getTimezoneData(request: Request) {
	const cookies = getRequestCookies(request)
	return tzlocator.get(cookies.timezone)
}
```

## Contributing

1.  Dynamically import `tzlocator.json` and make its instanciation (currently `tzlocator`) a function.
2.  Create a `getBrowserTimezone` utility function to replace `Intl.DateTimeFormat().resolvedOptions().timeZone`.

## Thanks

-   [Tiago de Almeida](https://gist.github.com/tiagodealmeida/0b97ccf117252d742dddf098bc6cc58a)
-   [IANA](https://data.iana.org/time-zones/releases/)
-   [Mutually Human](https://github.com/mhs/world-currencies/blob/master/currencies.json)
