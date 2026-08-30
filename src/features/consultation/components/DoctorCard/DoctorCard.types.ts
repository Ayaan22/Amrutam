import { Doctor } from '../../types';

export interface DoctorCardProps {
  doctor: Doctor;
  onPress?: (doctor: Doctor) => void;
  testID?: string;
}
