import { getFlight } from '@/data/api';
import { FlightIdentifier } from '@/data/Flight';
import { DynamicParams, Pages, SearchParams } from '@/data/routes';
import Link from 'next/link';

export type FlightPageProps = {
  params: { [DynamicParams.FlightIdentifier]: FlightIdentifier };
};

export default async function FlightPage({
  params: { [DynamicParams.FlightIdentifier]: flightIdentifier },
}: FlightPageProps) {
  const flight = await getFlight(flightIdentifier);

  return (
    <>
      <h1>Flight Details for {flight.flightIdentifier}</h1>
      Airport: {flight.airport} <br />
      Date: {flight.date} <br />
      Original Time: {flight.originalTime} <br />
      Expected Time: {flight.expectedTime} <br />
      <br />
      <Link
        href={`${Pages.Search}?${new URLSearchParams({
          [SearchParams.Query]: flight.airport,
        }).toString()}`}
      >
        More flights from {flight.airport}
      </Link>
    </>
  );
}
