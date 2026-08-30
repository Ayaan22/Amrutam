export interface SearchHistoryListProps {
  history: string[];
  onSelectTerm: (term: string) => void;
  onRemoveTerm: (term: string) => void;
  onClearAll: () => void;
}
