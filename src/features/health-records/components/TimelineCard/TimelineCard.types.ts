import { HealthRecord, RecordAttachment } from '../../types';

export interface TimelineCardProps {
  record: HealthRecord;
  isLast?: boolean;
  activeTag?: string | null;
  onTagPress: (tag: string) => void;
  onAttachmentPress: (attachment: RecordAttachment) => void;
}
