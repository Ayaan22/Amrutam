import { HealthRecordType } from '../../types';

export interface TypeFilterBarProps {
  selectedType: HealthRecordType | 'ALL';
  onSelectType: (type: HealthRecordType | 'ALL') => void;
}
