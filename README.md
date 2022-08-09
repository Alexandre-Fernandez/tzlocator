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
import { getTzlocator, getBrowserTimezone } from "tzlocator"

// returns the browser's timezone, e.g. "Europe/London"
const timezone = getBrowserTimezone()

// returns an instance of tzlocator
const tzlocator = getTzlocator("Europe/London" /* optional fallback timezone */)
const timezoneData = tzlocator.get(timezone)
```

#### Server side rendering

```ts
import { getBrowserTimezone } from "tzlocator"

const timezone = getBrowserTimezone()

// send the timezone to the server
document.cookie = `timezone=${timezone};`
```

### Server

```ts
import { getTzlocator } from "tzlocator"

const tzlocator = getTzlocator()

function getTimezoneData(request: Request) {
	// retrieves the browser's timezone from a cookie
	const cookies = getRequestCookies(request)
	return tzlocator.get(cookies.timezone)
}
```

## Thanks

-   [Tiago de Almeida](https://gist.github.com/tiagodealmeida/0b97ccf117252d742dddf098bc6cc58a)
-   [IANA](https://data.iana.org/time-zones/releases/)
-   [Mutually Human](https://github.com/mhs/world-currencies/blob/master/currencies.json)
