'use client';

import { useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pages, Params } from '@/app/data/routes';

export type SearchFormProps = {};

export default function SearchBar({}: SearchFormProps) {
  const router = useRouter();

  const search = useCallback(
    (query?: string) => {
      router.replace(`${Pages.Search}?${Params.Query}=${query}`);
    },
    [router],
  );

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(new FormData(event.currentTarget).get(Params.Query) as string);
  }, []);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checkValidity()) {
      search(event.target.value);
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center">
      <form onSubmit={onSubmit} method="GET" action={Pages.Search}>
        <input
          className="rounded border"
          placeholder="airport name"
          minLength={3}
          required
          onChange={onChange}
          name={Params.Query}
        />
        <button className="rounded border">Search flights</button>
      </form>
    </section>
  );
}
