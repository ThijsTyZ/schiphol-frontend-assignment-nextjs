import { TypedString } from '@/data/TypedString';

export type Flight = {
  flightIdentifier: FlightIdentifier;
  flightNumber: FlightNumber;
  airport: string;
  date: string;
  expectedTime: string;
  originalTime: string;
  url: string;
  score: string;
};

export type FlightIdentifier = TypedString<'FlightIdentifier'>;
export type FlightNumber = TypedString<'FlightNumber'>;
