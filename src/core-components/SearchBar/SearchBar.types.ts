import { StyleProp, ViewStyle } from 'react-native';

export interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  onPress?: () => void;
  showFilter?: boolean;
  onFilterPress?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
