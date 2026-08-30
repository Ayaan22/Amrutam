import { RecordAttachment } from '../../types';

export interface AttachmentModalProps {
  visible: boolean;
  attachment: RecordAttachment | null;
  onClose: () => void;
}
