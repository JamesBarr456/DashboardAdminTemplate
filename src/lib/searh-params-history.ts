import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsTimestamp
} from 'nuqs/server';

export const searchParamsHistory = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  type: parseAsString,
  date: parseAsTimestamp
};

export const searchParamsCacheHistory =
  createSearchParamsCache(searchParamsHistory);
export const serializeHistory = createSerializer(searchParamsHistory);
