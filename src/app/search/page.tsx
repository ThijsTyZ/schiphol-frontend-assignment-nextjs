'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Flight } from '@/data/Flight';
import FlightsTable from '@/components/FlightsTable';
import { Pages, SearchParams } from '@/data/routes';
import { SortDirection, SortOn } from '@/data/sorting';
import { search } from '@/data/api';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [flights, setFlights] = useState<ReadonlyArray<Flight>>([]);

  const query = searchParams.get(SearchParams.Query);
  const sortOn = searchParams.get(SearchParams.SortOn) as SortOn;
  const sortDirection = searchParams.get(SearchParams.SortDirection) as SortDirection;

  useEffect(() => {
    if (query) {
      search({ query, sortOn, sortDirection }).then(setFlights);
    }
  }, [query, sortOn, sortDirection]);

  const onHeaderClick = useCallback(
    (field: SortOn) => {
      router.replace(
        `${Pages.Search}?${new URLSearchParams({
          [SearchParams.Query]: query || '',
          [SearchParams.SortOn]: field,
          [SearchParams.SortDirection]:
            field === sortOn ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc',
        }).toString()}`,
      );
    },
    [router, query, sortOn, sortDirection],
  );

  return (
    <>
      <h1>Search Page </h1>
      {flights.length ? (
        <FlightsTable
          flights={flights}
          sortOn={sortOn}
          sortDirection={sortDirection}
          onHeaderClick={onHeaderClick}
        />
      ) : undefined}
    </>
  );
}
