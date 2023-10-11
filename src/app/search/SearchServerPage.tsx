import { SearchParams } from '@/data/routes';
import { SortDirection, SortOn } from '@/data/sorting';
import { search } from '@/data/api';
import { SearchClientPage } from '@/app/search/SearchClientPage';

type SearchServerPageProps = {
  searchParams: {
    [SearchParams.Query]: string;
    [SearchParams.SortOn]: SortOn;
    [SearchParams.SortDirection]: SortDirection;
  };
};

export async function SearchServerPage({
  searchParams: {
    [SearchParams.Query]: query,
    [SearchParams.SortOn]: sortOn = 'date',
    [SearchParams.SortDirection]: sortDirection = 'asc',
  },
}: SearchServerPageProps) {
  const flights = await search({ query, sortOn, sortDirection });

  return (
    <SearchClientPage
      flights={flights}
      query={query}
      sortOn={sortOn}
      sortDirection={sortDirection}
    />
  );
}
