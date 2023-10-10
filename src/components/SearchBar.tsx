'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pages, SearchParams } from '@/data/routes';

export type SearchFormProps = {};

export default function SearchBar({}: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const query = searchParams.get(SearchParams.Query);
    if (input.current && input.current.value !== query) {
      input.current.value = query || '';
    }
  }, [searchParams]);

  const search = useCallback(
    (query?: string) => {
      router.replace(`${Pages.Search}?${SearchParams.Query}=${query}`);
    },
    [router],
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      search(new FormData(event.currentTarget).get(SearchParams.Query) as string);
    },
    [search],
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checkValidity()) {
        search(event.target.value);
      }
    },
    [search],
  );

  return (
    <section className="flex flex-col items-center justify-center">
      <form onSubmit={onSubmit} method="GET" action={Pages.Search}>
        <input
          ref={input}
          className="rounded border"
          placeholder="airport name"
          minLength={3}
          required
          onChange={onChange}
          name={SearchParams.Query}
        />
        <button className="rounded border">Search flights</button>
      </form>
    </section>
  );
}
