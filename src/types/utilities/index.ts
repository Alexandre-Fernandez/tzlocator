export type LiteralUnion<T extends string | number> = T | Omit<T, T>
