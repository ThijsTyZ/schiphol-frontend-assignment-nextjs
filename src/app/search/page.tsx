'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const query = useSearchParams().get('query');

  return <h1>Search Page {query}</h1>;
}
