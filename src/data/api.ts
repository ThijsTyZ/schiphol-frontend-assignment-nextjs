import { Api, Params } from '@/data/routes';
import { SortDirection, SortOn } from '@/data/sorting';
import { Flight } from '@/data/Flight';

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
        [Params.Query]: query,
        [Params.SortOn]: sortOn,
        [Params.SortDirection]: sortDirection,
        limit: limit.toString(10),
      })}`,
    )
  ).json();
}
