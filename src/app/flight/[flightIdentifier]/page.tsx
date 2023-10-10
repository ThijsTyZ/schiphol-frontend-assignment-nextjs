import { getFlight } from '@/data/api';
import { FlightIdentifier } from '@/data/Flight';
import { DynamicParams } from '@/data/routes';

export type FlightPageProps = {
  params: { [DynamicParams.FlightIdentifier]: FlightIdentifier };
};

export default async function FlightPage({
  params: { [DynamicParams.FlightIdentifier]: flightIdentifier },
}: FlightPageProps) {
  const flight = await getFlight(flightIdentifier);

  return <h1>Flight Page {flight.airport}</h1>;
}
