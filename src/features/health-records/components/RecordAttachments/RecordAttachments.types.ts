import { RecordAttachment } from '../../types';

export interface RecordAttachmentsProps {
  attachments?: RecordAttachment[];
  onAttachmentPress: (attachment: RecordAttachment) => void;
}
