import { Flight } from '@/data/Flight';

export type SortOn = keyof Pick<Flight, 'date' | 'airport' | 'flightNumber'>;
export type SortDirection = 'asc' | 'desc';
