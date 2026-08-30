import React, { useState, useMemo, useCallback } from 'react';
import {
  StatusBar,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar, Surface, Text } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { MOCK_HEALTH_RECORDS } from '../mockData';
import { HealthRecord, HealthRecordType, RecordAttachment, MonthYearGroup } from '../types';
import {
  TypeFilterBar,
  MonthSectionHeader,
  TimelineCard,
  AttachmentModal,
} from '../components';
import { createStyles } from './HealthRecordsScreen.styles';

export const HealthRecordsScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<HealthRecordType | 'ALL'>('ALL');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [previewAttachment, setPreviewAttachment] = useState<RecordAttachment | null>(null);

  const handleTagPress = useCallback((tag: string) => {
    setSelectedTag((prev) => (prev?.toLowerCase() === tag.toLowerCase() ? null : tag));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedType('ALL');
    setSelectedTag(null);
  }, []);

  // Filter records based on search, type, and tag
  const filteredRecords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MOCK_HEALTH_RECORDS.filter((record: HealthRecord) => {
      // Type filter
      if (selectedType !== 'ALL' && record.type !== selectedType) {
        return false;
      }

      // Tag filter
      if (
        selectedTag &&
        !record.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      ) {
        return false;
      }

      // Search query
      if (query) {
        const matchesTitle = record.title.toLowerCase().includes(query);
        const matchesDoctor = record.doctor.toLowerCase().includes(query);
        const matchesFacility = record.facility?.toLowerCase().includes(query);
        const matchesNotes = record.notes.toLowerCase().includes(query);
        const matchesTags = record.tags.some((t) => t.toLowerCase().includes(query));
        const matchesAttachments = record.attachments?.some((a) =>
          a.name.toLowerCase().includes(query)
        );

        if (
          !matchesTitle &&
          !matchesDoctor &&
          !matchesFacility &&
          !matchesNotes &&
          !matchesTags &&
          !matchesAttachments
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedType, selectedTag]);

  // Group filtered records by Month and Year
  const groupedTimeline = useMemo<MonthYearGroup[]>(() => {
    const groupsMap = new Map<string, HealthRecord[]>();

    filteredRecords.forEach((record) => {
      const d = new Date(record.date);
      const monthIndex = d.getMonth();
      const monthName = STRINGS.healthRecords.monthNames[monthIndex] || '';
      const monthYear = `${monthName} ${d.getFullYear()}`;

      if (!groupsMap.has(monthYear)) {
        groupsMap.set(monthYear, []);
      }
      groupsMap.get(monthYear)!.push(record);
    });

    const groups: MonthYearGroup[] = [];
    groupsMap.forEach((records, monthYear) => {
      groups.push({ monthYear, records });
    });

    return groups;
  }, [filteredRecords]);

  return (
    <Surface style={styles.container}>
      <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} />

      {/* Header & Search */}
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>{STRINGS.healthRecords.title}</Text>
        <Text style={styles.headerSubtitle}>
          {STRINGS.healthRecords.subtitle}
        </Text>

        <SearchBar
          value={searchQuery}
          placeholder={STRINGS.healthRecords.searchPlaceholder}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </View>

      {/* Record Type Horizontal Filter Chips */}
      <TypeFilterBar
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* Active Tag Filter Indicator */}
      {selectedTag && (
        <View style={styles.activeTagRow}>
          <Text style={styles.activeTagLabel}>
            {STRINGS.healthRecords.filteredByTag}
          </Text>
          <Pressable onPress={() => setSelectedTag(null)} style={styles.activeTagPill}>
            <Text style={styles.activeTagText}>#{selectedTag}</Text>
            <MaterialCommunityIcons
              name="close"
              size={13}
              color={theme.colors.primary}
            />
          </Pressable>
        </View>
      )}

      {/* Timeline List Grouped by Month/Year */}
      {groupedTimeline.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="clipboard-text-search-outline"
            size={48}
            color={theme.colors.primaryMuted}
          />
          <Text style={styles.emptyTitle}>
            {STRINGS.healthRecords.emptyTitle}
          </Text>
          <Text style={styles.emptySubtitle}>
            {STRINGS.healthRecords.emptySubtitle}
          </Text>
          {(searchQuery.length > 0 || selectedType !== 'ALL' || selectedTag) && (
            <Pressable onPress={handleClearFilters} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>
                {STRINGS.healthRecords.clearFilters}
              </Text>
            </Pressable>
          )}
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {groupedTimeline.map((group) => (
            <View key={group.monthYear}>
              {/* Month / Year Section Header */}
              <MonthSectionHeader
                monthYear={group.monthYear}
                count={group.records.length}
              />

              {/* Timeline Cards */}
              {group.records.map((record, idx) => (
                <TimelineCard
                  key={record.id}
                  record={record}
                  isLast={idx === group.records.length - 1}
                  activeTag={selectedTag}
                  onTagPress={handleTagPress}
                  onAttachmentPress={(att) => setPreviewAttachment(att)}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Attachment Preview Modal */}
      <AttachmentModal
        visible={previewAttachment !== null}
        attachment={previewAttachment}
        onClose={() => setPreviewAttachment(null)}
      />
    </Surface>
  );
};

export default HealthRecordsScreen;
