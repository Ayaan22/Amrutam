export interface RecordTagsProps {
  tags: string[];
  activeTag?: string | null;
  onTagPress: (tag: string) => void;
}
