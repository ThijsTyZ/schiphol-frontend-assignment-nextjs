import React, { useCallback } from 'react';
import { Flight } from '@/data/Flight';
import { SortDirection, SortOn } from '@/data/sorting';
import Link from 'next/link';
import { DynamicParams, Pages } from '@/data/routes';
import { createPath } from 'router-path';

export type FlightsTableProps = {
  flights: ReadonlyArray<Flight>;
  sortOn?: SortOn;
  sortDirection?: SortDirection;
  onHeaderClick: (field: SortOn) => void;
};

function FlightsTable({ flights, ...rest }: FlightsTableProps) {
  return (
    <table className="FlightsTable">
      <caption>Flight search results</caption>
      <thead>
        <tr>
          <TableHeader label="Date" field="date" {...rest} />
          <TableHeader label="Airport" field="airport" {...rest} />
          <TableHeader label="Flight Number" field="flightNumber" {...rest} />
        </tr>
      </thead>
      <tbody>
        {flights?.map((flight) => {
          const href = createPath(Pages.Flight, {
            [DynamicParams.FlightIdentifier]: flight.flightIdentifier,
          });

          return (
            <tr key={flight.flightIdentifier}>
              <td>
                <Link href={href}>
                  {flight.date} {flight.expectedTime}{' '}
                </Link>
              </td>
              <td>
                <Link href={href}>{flight.airport} </Link>
              </td>
              <td>
                <Link href={href}>{flight.flightNumber} </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

type TableHeaderProps = {
  label: string;
  field: SortOn;
} & Omit<FlightsTableProps, 'flights'>;

function TableHeader({ label, field, sortOn, sortDirection, onHeaderClick }: TableHeaderProps) {
  const onClick = useCallback(() => {
    onHeaderClick(field);
  }, [field, onHeaderClick]);

  return (
    <th scope="col" onClick={onClick}>
      {label}
      {field && field === sortOn && (sortDirection === 'asc' ? <>↓</> : <>↑</>)}
    </th>
  );
}

export default FlightsTable;
