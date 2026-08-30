import React, { memo } from 'react';
import {
  Modal,
  View,
  Pressable,
  Image as RNImage,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { AttachmentModalProps } from './AttachmentModal.types';
import { createStyles } from './AttachmentModal.styles';

export const AttachmentModal: React.FC<AttachmentModalProps> = memo(
  ({ visible, attachment, onClose }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    if (!attachment) return null;

    const isPdf = attachment.type === 'pdf';

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                {/* Header */}
                <View style={styles.header}>
                  <View style={styles.headerInfo}>
                    <Text
                      style={styles.title}
                      numberOfLines={1}
                      ellipsizeMode="middle"
                    >
                      {attachment.name}
                    </Text>
                    <Text style={styles.subtitle}>
                      {isPdf
                        ? STRINGS.healthRecords.attachments.pdfDocument
                        : STRINGS.healthRecords.attachments.medicalImage}
                      {attachment.size ? ` • ${attachment.size}` : ''}
                    </Text>
                  </View>

                  <Pressable
                    onPress={onClose}
                    style={styles.closeButton}
                    accessibilityRole="button"
                    accessibilityLabel={STRINGS.healthRecords.attachments.closePreview}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={22}
                      color={theme.colors.textSecondary}
                    />
                  </Pressable>
                </View>

                {/* Preview Image / PDF */}
                <View style={styles.previewArea}>
                  <RNImage
                    source={{ uri: attachment.uri }}
                    style={styles.previewImage}
                    resizeMode="cover"
                  />
                  {isPdf && (
                    <View style={styles.pdfNotice}>
                      <Text style={styles.pdfNoticeText}>
                        🌿 {STRINGS.healthRecords.attachments.verifiedNotice}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

AttachmentModal.displayName = 'AttachmentModal';
export default AttachmentModal;
