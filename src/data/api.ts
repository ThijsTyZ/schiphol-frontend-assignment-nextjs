import { Api, DynamicParams, SearchParams } from '@/data/routes';
import { SortDirection, SortOn } from '@/data/sorting';
import { Flight, FlightIdentifier } from '@/data/Flight';
import { createPath } from 'router-path';

export async function search({
  query,
  sortOn = 'date',
  sortDirection = 'asc',
  limit = 5,
}: {
  query: string;
  sortOn?: SortOn;
  sortDirection?: SortDirection;
  limit?: number;
}): Promise<ReadonlyArray<Flight>> {
  return await (
    await fetch(
      `${Api.Search}?${new URLSearchParams({
        [SearchParams.Query]: query,
        [SearchParams.SortOn]: sortOn,
        [SearchParams.SortDirection]: sortDirection,
        limit: limit.toString(10),
      })}`,
    )
  ).json();
}

export async function getFlight(flightIdentifier: FlightIdentifier): Promise<Flight> {
  return await (
    await fetch(createPath(Api.Flight, { [DynamicParams.FlightIdentifier]: flightIdentifier }))
  ).json();
}
