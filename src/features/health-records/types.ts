export type HealthRecordType =
  | 'Lab Report'
  | 'Prescription'
  | 'Consultation'
  | 'Vaccination'
  | 'Allergy';

export interface RecordAttachment {
  id: string;
  name: string;
  type: 'image' | 'pdf';
  uri: string;
  size?: string;
}

export interface HealthRecord {
  id: string;
  type: HealthRecordType;
  title: string;
  date: string; // ISO or YYYY-MM-DD
  doctor: string;
  facility?: string;
  notes: string;
  tags: string[];
  attachments?: RecordAttachment[];
}

export interface MonthYearGroup {
  monthYear: string;
  records: HealthRecord[];
}
