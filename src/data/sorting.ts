import { Flight } from '@/data/Flight';

export type SortOn = keyof Pick<Flight, 'date' | 'airport' | 'flightNumber'>;

export function getSortOn(sortOn: string | null | undefined): SortOn {
  switch (sortOn) {
    case null:
    case undefined:
      return 'date';
    case 'date':
    case 'airport':
    case 'flightNumber':
      return sortOn;
    default:
      throw new Error(`Invalid sortOn option: '${sortOn}'`);
  }
}

export type SortDirection = 'asc' | 'desc';

export function getSortDirection(sortDirection: string | null | undefined): SortDirection {
  switch (sortDirection) {
    case null:
    case undefined:
      return 'asc';
    case 'asc':
    case 'desc':
      return sortDirection;
    default:
      throw new Error(`Invalid sortDirection option: '${sortDirection}'`);
  }
}
