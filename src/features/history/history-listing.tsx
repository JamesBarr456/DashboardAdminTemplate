import HistoryViewPage from './components/history-view-page';
import { searchParamsCacheHistory } from '@/lib/searh-params-history';

type HistoryListingPage = {};

export default async function HistoryListingPage({}: HistoryListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCacheHistory.get('page');
  const pageLimit = searchParamsCacheHistory.get('perPage');
  const type = searchParamsCacheHistory.get('type');
  const date = searchParamsCacheHistory.get('date');
  const filters = {
    page,
    limit: pageLimit,
    ...(type && { type }),
    ...(date && { date: date })
  };

  return <HistoryViewPage filters={filters} />;
}
