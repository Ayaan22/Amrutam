import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme';
import { STRINGS } from '../../constants/strings';
import { Button } from '../Button';
import { ErrorStateProps } from './ErrorState.types';
import { createStyles } from './ErrorState.styles';

export const ErrorState: React.FC<ErrorStateProps> = memo(({
  title = STRINGS.errorState.defaultTitle,
  description = STRINGS.errorState.defaultDescription,
  actionLabel = STRINGS.errorState.defaultAction,
  onActionPress,
  icon,
  style,
  testID,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {actionLabel && onActionPress && (
        <Button
          title={actionLabel}
          variant="primary"
          size="medium"
          onPress={onActionPress}
          style={styles.actionButton}
        />
      )}
    </View>
  );
});

ErrorState.displayName = 'ErrorState';
