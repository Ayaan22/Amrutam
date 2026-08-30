import React, { memo } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@core-components';
import { useTheme } from '@theme';
import { RecordTagsProps } from './RecordTags.types';
import { createStyles } from './RecordTags.styles';

export const RecordTags: React.FC<RecordTagsProps> = memo(
  ({ tags, activeTag, onTagPress }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    if (!tags || tags.length === 0) return null;

    return (
      <View style={styles.container}>
        {tags.map((tag) => {
          const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();
          return (
            <Pressable
              key={tag}
              onPress={() => onTagPress(tag)}
              style={[styles.tagChip, isSelected && styles.tagChipActive]}
              accessibilityRole="button"
              accessibilityLabel={`Filter by tag ${tag}`}
            >
              <Text style={[styles.tagText, isSelected && styles.tagTextActive]}>
                #{tag}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }
);

RecordTags.displayName = 'RecordTags';
export default RecordTags;
