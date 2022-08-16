import currencies from "../../json/currencies.json"
import type { CurrencyCode, CurrencyName, CurrencySymbol } from "../types/base"
import type { LiteralUnion } from "../types/utilities"

class Currency {
	code: CurrencyCode

	symbol: CurrencySymbol

	name: CurrencyName

	/**
	 * Returns a boolean indicating if the `currencyCode` has an assigned
	 * Currency.
	 */
	static exists(
		currencyCode: LiteralUnion<CurrencyCode>
	): currencyCode is CurrencyCode {
		if (currencies[currencyCode as CurrencyCode]) return true
		return false
	}

	constructor(currencyCode: LiteralUnion<CurrencyCode>) {
		if (!Currency.exists(currencyCode)) {
			throw new Error(`${currencyCode} is not a valid currency.`)
		}
		this.code = currencyCode
		this.symbol = currencies[currencyCode].symbol as CurrencySymbol
		this.name = currencies[currencyCode].name as CurrencyName
	}
}

export default Currency
