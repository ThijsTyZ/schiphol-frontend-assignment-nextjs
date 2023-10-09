import { Api, SearchParams } from '@/data/routes';
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
        [SearchParams.Query]: query,
        [SearchParams.SortOn]: sortOn,
        [SearchParams.SortDirection]: sortDirection,
        limit: limit.toString(10),
      })}`,
    )
  ).json();
}
