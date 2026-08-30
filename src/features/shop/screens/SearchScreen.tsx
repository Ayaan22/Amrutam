import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { Surface, Text, SearchBar, EmptyState, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS, MOCK_PRODUCTS } from '@utils';
import { useDebounce } from '../hooks';
import { Product, ProductCategory, SortOption, ProductFilterState } from '@features/shop/types';
import {
  ProductCard,
  SearchHistoryList,
  CartBadgeButton,
  WishlistBadgeButton,
  WishlistModal,
  FilterModal,
  FilterSortBar,
} from '../components';
import { AppStackParamList } from '@app/navigation/types';
import {
  getSearchHistory,
  addSearchHistoryItem,
  removeSearchHistoryItem,
  clearSearchHistory,
} from '@services';
import { useCartStore, useWishlistStore } from '@store';
import { createStyles } from './SearchScreen.styles';

type SearchScreenRouteProp = RouteProp<AppStackParamList, 'Search'>;
type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const PAGE_SIZE = 4;

export const SearchScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SearchScreenRouteProp>();

  const initialQuery = route.params?.initialQuery || '';
  const initialCategory = route.params?.category;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [history, setHistory] = useState<string[]>([]);

  const cartTotalCount = useCartStore((state) => state.getTotalCount());
  const wishlistTotalCount = useWishlistStore((state) => state.getWishlistCount());

  // Multi-filter and Sort State
  const [filters, setFilters] = useState<ProductFilterState>({
    categories: initialCategory && initialCategory !== 'All' ? [initialCategory] : [],
    doshas: [],
    inStockOnly: false,
  });
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  // Modals
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Infinite Scroll Pagination
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Load search history from MMKV on mount
  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  // Debounce search query by 250ms for smooth live filtering
  const debouncedQuery = useDebounce(searchQuery, 250);

  const handleSearchSubmit = () => {
    const trimmed = searchQuery.trim();
    if (trimmed.length >= 2) {
      const updated = addSearchHistoryItem(trimmed);
      setHistory(updated);
    }
  };

  const processedProducts = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();
    let list = [...MOCK_PRODUCTS];

    if (query) {
      list = list.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.subtitle.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.keyIngredients.some((ing) => ing.toLowerCase().includes(query)) ||
          product.benefits.some((b) => b.toLowerCase().includes(query))
        );
      });
    }

    // Filter by Categories
    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }

    // Filter by Doshas
    if (filters.doshas.length > 0) {
      list = list.filter((p) =>
        p.doshaSuitability.some((dosha) => filters.doshas.includes(dosha))
      );
    }

    // Filter by In-Stock
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Sorting
    if (sortOption === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [debouncedQuery, filters, sortOption]);

  const visibleProducts = useMemo(() => {
    return processedProducts.slice(0, displayedCount);
  }, [processedProducts, displayedCount]);

  const hasMore = displayedCount < processedProducts.length;

  const handleEndReached = () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount((prev) => Math.min(prev + PAGE_SIZE, processedProducts.length));
      setIsLoadingMore(false);
    }, 400);
  };

  const handleProductPress = useCallback(
    (product: Product) => {
      const trimmed = searchQuery.trim();
      if (trimmed.length >= 2) {
        const updated = addSearchHistoryItem(trimmed);
        setHistory(updated);
      }
      navigation.navigate(STRINGS.navigation.routes.productDetails, { product });
    },
    [navigation, searchQuery]
  );

  const handleSelectHistoryTerm = (term: string) => {
    setSearchQuery(term);
  };

  const handleRemoveHistoryTerm = (term: string) => {
    const updated = removeSearchHistoryItem(term);
    setHistory(updated);
  };

  const handleClearAllHistory = () => {
    clearSearchHistory();
    setHistory([]);
  };

  const handleApplyFilters = (newFilters: ProductFilterState, newSort: SortOption) => {
    setFilters(newFilters);
    setSortOption(newSort);
    setDisplayedCount(PAGE_SIZE);
  };

  const handleResetFilters = () => {
    setFilters({ categories: [], doshas: [], inStockOnly: false });
    setSortOption('featured');
    setDisplayedCount(PAGE_SIZE);
  };

  const handleRemoveCategory = (category: ProductCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const handleRemoveDosha = (dosha: string) => {
    setFilters((prev) => ({
      ...prev,
      doshas: prev.doshas.filter((d) => d !== dosha),
    }));
  };

  const handleToggleInStock = () => {
    setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }));
  };

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={handleProductPress}
      />
    ),
    [handleProductPress]
  );

  const isBrowsingWithFilterOrQuery =
    searchQuery.trim().length > 0 ||
    filters.categories.length > 0 ||
    filters.doshas.length > 0 ||
    filters.inStockOnly;

  const renderFooter = () => {
    if (!isBrowsingWithFilterOrQuery || processedProducts.length === 0) return null;

    return (
      <View style={styles.footerLoader}>
        {isLoadingMore ? (
          <>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text variant="caption" color="muted" style={styles.footerText}>
              {STRINGS.shop.pagination.loadingMore}
            </Text>
          </>
        ) : hasMore ? (
          <Button
            title={STRINGS.shop.pagination.loadMore}
            variant="ghost"
            size="small"
            onPress={handleEndReached}
          />
        ) : (
          <Text variant="caption" color="muted" style={styles.footerText}>
            {STRINGS.shop.pagination.allLoaded}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Surface style={styles.container}>
      {/* Top Search Bar with Back, Wishlist & Cart Navigation */}
      <View style={styles.topBar}>
        <Button
          variant="ghost"
          size="small"
          onPress={() => navigation.goBack()}
          accessibilityLabel={STRINGS.common.back}
          style={styles.iconButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={theme.colors.textPrimary}
          />
        </Button>

        <View style={styles.searchBarWrapper}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={handleSearchSubmit}
            placeholder={STRINGS.shop.searchPlaceholder}
            autoFocus={!initialQuery && !initialCategory}
          />
        </View>

        <WishlistBadgeButton
          count={wishlistTotalCount}
          onPress={() => setIsWishlistModalOpen(true)}
        />

        <CartBadgeButton
          count={cartTotalCount}
          onPress={() => navigation.navigate(STRINGS.navigation.routes.cart as any)}
        />
      </View>

      {/* Multi-filter & Sorting Controls */}
      <FilterSortBar
        filters={filters}
        sortOption={sortOption}
        onOpenModal={() => setIsFilterModalOpen(true)}
        onRemoveCategory={handleRemoveCategory}
        onRemoveDosha={handleRemoveDosha}
        onToggleInStock={handleToggleInStock}
      />

      {/* Show Search History when Query and Filters are empty */}
      {!isBrowsingWithFilterOrQuery ? (
        <SearchHistoryList
          history={history}
          onSelectTerm={handleSelectHistoryTerm}
          onRemoveTerm={handleRemoveHistoryTerm}
          onClearAll={handleClearAllHistory}
        />
      ) : (
        /* Results FlashList */
        <FlashList
          data={visibleProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.resultsCountRow}>
              <Text variant="caption" color="secondary">
                {STRINGS.shop.resultsCount(processedProducts.length, searchQuery.trim() || undefined)}
              </Text>
            </View>
          }
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <EmptyState
              title={STRINGS.shop.emptySearch.title}
              description={STRINGS.shop.emptySearch.description}
              actionLabel={STRINGS.shop.filters.resetAll}
              onActionPress={() => {
                setSearchQuery('');
                handleResetFilters();
              }}
            />
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.4}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Multi-filter & Sorting Modal */}
      <FilterModal
        visible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        sortOption={sortOption}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        visible={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        onSelectProduct={handleProductPress}
      />
    </Surface>
  );
};

export default SearchScreen;
