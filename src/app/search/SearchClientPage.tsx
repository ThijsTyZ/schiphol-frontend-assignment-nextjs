'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Flight } from '@/data/Flight';
import FlightsTable from '@/components/FlightsTable';
import { Pages, SearchParams } from '@/data/routes';
import { getSortDirection, getSortOn, SortDirection, SortOn } from '@/data/sorting';
import { search } from '@/data/api';
import { useCallback, useEffect, useRef, useState } from 'react';

type SearchClientPage = {
  flights: ReadonlyArray<Flight>;
  query: string;
  sortOn: SortOn;
  sortDirection: SortDirection;
};

export function SearchClientPage(props: SearchClientPage) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [flights, setFlights] = useState<ReadonlyArray<Flight>>(props.flights);
  const [query, setQuery] = useState<string | null>(props.query);
  const [sortOn, setSortOn] = useState<SortOn>(props.sortOn);
  const [sortDirection, setSortDirection] = useState<SortDirection>(props.sortDirection);
  const isInitialMount = useRef(true);

  useEffect(() => {
    setQuery(searchParams.get(SearchParams.Query));
    setSortOn(getSortOn(searchParams.get(SearchParams.SortOn)));
    setSortDirection(getSortDirection(searchParams.get(SearchParams.SortDirection)));
  }, [searchParams]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (query) {
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
