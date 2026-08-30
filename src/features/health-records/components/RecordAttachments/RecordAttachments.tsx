import React, { memo } from 'react';
import { View, Pressable, Image as RNImage } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '@core-components';
import { useTheme } from '@theme';
import { RecordAttachmentsProps } from './RecordAttachments.types';
import { createStyles } from './RecordAttachments.styles';

export const RecordAttachments: React.FC<RecordAttachmentsProps> = memo(
  ({ attachments, onAttachmentPress }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    if (!attachments || attachments.length === 0) return null;

    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {attachments.map((att) => (
            <Pressable
              key={att.id}
              onPress={() => onAttachmentPress(att)}
              style={styles.button}
              accessibilityRole="button"
              accessibilityLabel={`Preview ${att.name}`}
            >
              {att.type === 'pdf' ? (
                <View style={styles.pdfIconBox}>
                  <MaterialCommunityIcons
                    name="file-pdf-box"
                    size={16}
                    color={theme.colors.error}
                  />
                </View>
              ) : (
                <RNImage
                  source={{ uri: att.uri }}
                  style={styles.imageThumb}
                  resizeMode="cover"
                />
              )}
              <View style={styles.infoCol}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {att.name}
                </Text>
                {att.size && <Text style={styles.size}>{att.size}</Text>}
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }
);

RecordAttachments.displayName = 'RecordAttachments';
export default RecordAttachments;
