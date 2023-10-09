export const DynamicParams = {
  FlightIdentifier: 'flightIdentifier',
} as const;

export const SearchParams = {
  Query: 'query',
  SortOn: 'sort',
  SortDirection: 'dir',
  Limit: 'limit',
} as const;

export const Pages = {
  Search: '/search',
  Flight: `/flight/[${DynamicParams.FlightIdentifier}]`,
} as const;

export const Api = {
  Search: '/api/search',
} as const;
