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
import { Tzlocator, getBrowserTimezone } from "tzlocator"

const tzlocator = new TzLocator()
const location = tzlocator.get(getBrowserTimezone())
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

const tzlocator = new TzLocator()

function getLocation(request: Request) {
	// retrieves the browser's timezone from a cookie
	const cookies = getRequestCookies(request)
	return tzlocator.get(cookies.timezone)
}
```

## Thanks

-   [IANA](https://data.iana.org/time-zones/releases/)
-   [Wikipedia](https://www.wikipedia.org/)
