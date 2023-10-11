'use client';

import { useCallback, useDeferredValue, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pages, SearchParams } from '@/data/routes';

export type SearchFormProps = {};

export default function SearchBar({}: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const query = searchParams.get(SearchParams.Query);
    if (input.current && input.current.value !== query) {
      input.current.value = query || '';
    }
  }, [searchParams]);

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(new FormData(event.currentTarget).get(SearchParams.Query) as string);
  }, []);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checkValidity()) {
      setQuery(event.target.value);
    }
  }, []);

  useEffect(() => {
    if (deferredQuery) {
      router.replace(`${Pages.Search}?${SearchParams.Query}=${deferredQuery}`);
    }
  }, [deferredQuery, router]);

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
