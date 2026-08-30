import { HealthRecordType } from '../../types';

export interface TimelineNodeProps {
  type: HealthRecordType;
  isLast?: boolean;
}
