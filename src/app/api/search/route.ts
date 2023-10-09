import { NextRequest, NextResponse } from 'next/server';
import flights from '../../data/flights.json';
import { Params } from '@/app/data/routes';
import { SortDirection, SortOn } from '@/app/data/sorting';
import { Flight } from '@/app/data/Flight';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get(Params.Query) ?? '';
  const sortOn = searchParams.get(Params.SortOn) as SortOn | null;
  const sortDirection = searchParams.get(Params.SortDirection) as SortDirection | null;
  const limit = parseInt(searchParams.get(Params.Limit) ?? '', 10) ?? 10;

  const results = (flights.flights as unknown as ReadonlyArray<Flight>)
    .filter((flight) => flight.airport.toLowerCase().includes(query.toLowerCase()))
    .sort((flight1, flight2) => {
      switch (sortOn) {
        case null:
        case undefined:
          return 0;
        case 'date': {
          return (
            new Date(`${flight1.date} ${flight1.expectedTime}`).getTime() -
            new Date(`${flight2.date} ${flight2.expectedTime}`).getTime()
          );
        }
        case 'airport': {
          return flight1.airport.localeCompare(flight2.airport);
        }
        case 'flightNumber': {
          return flight1.airport.localeCompare(flight2.airport);
        }
        default: {
          throw new Error(`Invalid sortBy option: ${sortOn}`);
        }
      }
    })
    .sort(() => (sortDirection === 'desc' ? -1 : 1))

    .slice(0, limit);

  return new NextResponse(JSON.stringify(results), { status: 200 });
}
