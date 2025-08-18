import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';

export const searchParamsOrder = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  id: parseAsString,
  user_name: parseAsString,
  status: parseAsString
  // advanced filter
  // filters: getFiltersStateParser().withDefault([]),
  // joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and')
};

export const searchParamsOrderCache =
  createSearchParamsCache(searchParamsOrder);
export const serializeOrder = createSerializer(searchParamsOrder);
