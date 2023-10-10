import { NextRequest, NextResponse } from 'next/server';
import flights from '../../../../data/flights.json';
import { DynamicParams } from '@/data/routes';
import { Flight, FlightIdentifier } from '@/data/Flight';

export async function GET(
  request: NextRequest,
  { params }: { params: { [DynamicParams.FlightIdentifier]: FlightIdentifier } },
) {
  const flightIdentifier = params[DynamicParams.FlightIdentifier];

  const flight = (flights.flights as unknown as ReadonlyArray<Flight>).find(
    (flight) => flightIdentifier === flight.flightIdentifier,
  );

  return new NextResponse(
    JSON.stringify(flight || `No flight found with flightIdentifier '${flightIdentifier}'`),
    { status: flight ? 200 : 404 },
  );
}
