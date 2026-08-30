import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '@core-components';
import { useTheme } from '@theme';
import { TimelineNode } from '../TimelineNode';
import { RecordHeader } from '../RecordHeader';
import { RecordTags } from '../RecordTags';
import { RecordAttachments } from '../RecordAttachments';
import { TimelineCardProps } from './TimelineCard.types';
import { createStyles } from './TimelineCard.styles';

export const TimelineCard: React.FC<TimelineCardProps> = memo(
  ({ record, isLast = false, activeTag, onTagPress, onAttachmentPress }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
      <View style={styles.container}>
        {/* Left Timeline Node & Vertical Connector Line */}
        <TimelineNode type={record.type} isLast={isLast} />

        {/* Right Card Body */}
        <View style={styles.cardContent}>
          {/* Record Header (Type Badge + Date) */}
          <RecordHeader type={record.type} date={record.date} />

          {/* Title */}
          <Text style={styles.title}>{record.title}</Text>

          {/* Doctor & Facility with seamless inline text wrapping */}
          <View style={styles.doctorRow}>
            <MaterialCommunityIcons
              name="stethoscope"
              size={13}
              color={theme.colors.primaryMuted}
              style={styles.doctorIcon}
            />
            <Text style={styles.doctorDetailsText}>
              <Text style={styles.doctorName}>{record.doctor}</Text>
              {record.facility ? (
                <Text style={styles.facilityName}> • {record.facility}</Text>
              ) : null}
            </Text>
          </View>

          {/* Clinical Notes */}
          <Text style={styles.notes}>{record.notes}</Text>

          {/* Tags */}
          <RecordTags
            tags={record.tags}
            activeTag={activeTag}
            onTagPress={onTagPress}
          />

          {/* Attachments */}
          <RecordAttachments
            attachments={record.attachments}
            onAttachmentPress={onAttachmentPress}
          />
        </View>
      </View>
    );
  }
);

TimelineCard.displayName = 'TimelineCard';
export default TimelineCard;
