import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme';
import { Button } from '../Button';
import { EmptyStateProps } from './EmptyState.types';
import { createStyles } from './EmptyState.styles';

export const EmptyState: React.FC<EmptyStateProps> = memo(({
  title,
  description,
  actionLabel,
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

EmptyState.displayName = 'EmptyState';
