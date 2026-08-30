# 🌿 Amrutam - Holistic Ayurveda & Patient Care Mobile Application

A production-grade, feature-rich React Native (TypeScript) mobile application built for **Amrutam**. The platform seamlessly unifies three core healthcare verticals: **Ayurvedic Doctor Consultations**, **Authentic Herbal E-Commerce**, and **Patient Health Records & Clinical Timeline** with an enterprise-grade **Offline-First Architecture**.

---

## 📑 Table of Contents
1. [System Architecture](#-system-architecture)
2. [Folder Structure](#-folder-structure)
3. [Feature Modules](#-feature-modules)
4. [Offline-First Strategy & Synchronization Engine](#-offline-first-strategy--synchronization-engine)
5. [Architectural Decisions & Design System](#-architectural-decisions--design-system)
6. [State Management Choice](#-state-management-choice)
7. [Performance Optimizations](#-performance-optimizations)
8. [Trade-offs Made](#-trade-offs-made)
9. [Future Improvements](#-future-improvements)
10. [Setup & Running Locally](#-setup--running-locally)

---

## 🏛 System Architecture

The application is architected following **Feature-Driven Development (FDD)** and **Clean Architecture** principles. Each domain feature encapsulates its own presentation layer, sub-components, type definitions, and business logic while sharing a centralized theme system, core design atoms, and global state stores.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Presentation Layer                            │
│   ┌───────────────────┐ ┌───────────────────┐ ┌─────────────────────┐   │
│   │   Consultation    │ │     Ayurvedic     │ │    Health Records   │   │
│   │   & Doctor Slots  │ │      Shop/Cart    │ │   Patient Timeline  │   │
│   └───────────────────┘ └───────────────────┘ └─────────────────────┘   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                    Shared UI & Design System Layer                      │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Core Atoms: Text, Surface, Button, Badge, SearchBar, Card, Image│   │
│   │  Theme Engine: colors, spacing, radius, typography, scale/vs/ms │   │
│   │  String Dictionary: STRINGS (Single Source of Truth)            │   │
│   └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                  Business Logic, Services & Offline Sync                │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Zustand Stores: cartStore, wishlistStore, appStore, networkStore│   │
│   │  Services: apiCache, offlineSync, storage (MMKV Native Engine)  │   │
│   │  Network Monitor: @react-native-community/netinfo Auto-Sync     │   │
│   └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

Every module strictly adheres to a modular, predictable directory layout. Individual components follow the **4-file anatomy** (`[Component].tsx`, `[Component].styles.ts`, `[Component].types.ts`, and `index.ts`), ensuring strong typing, zero circular dependencies, and complete separation of styling from rendering logic.

```
src/
├── app/                          # Application Bootstrap & Routing
│   └── navigation/               # Navigation Trees & Param Lists
│       ├── AppNavigator.tsx      # Root Stack Navigator
│       ├── AppStack.tsx          # Main Application Stack
│       ├── AuthStack.tsx         # Authentication Flow Stack
│       ├── BottomTabNavigator.tsx# Primary Tab Bar (Consult, Shop, Records)
│       └── types.ts              # RouteParamList Contracts
│
├── constants/                    # Application-wide Constants
│   └── strings.ts                # STRINGS: Centralized UI Copy, Labels, Routes
│
├── core-components/              # Reusable Atomic Design System
│   ├── Badge/                    # Colored Status Badges (primary, success, error, warning)
│   ├── Button/                   # Accessible Styled Buttons (primary, ghost, secondary)
│   ├── Card/                     # Surface Elevation Wrappers
│   ├── EmptyState/               # Universal Illustrated Empty Views
│   ├── Image/                    # Cached & Fallback-aware Image Component
│   ├── Input/                    # Styled Text Inputs
│   ├── SearchBar/                # Live Search Input with Filter & Clear Triggers
│   ├── Surface/                  # Theme Background Surface Container
│   ├── Text/                     # Typographic Scaled Text Primitives
│   └── index.ts                  # Atomic Exports
│
├── features/                     # Domain Feature Modules (FDD Architecture)
│   │
│   ├── auth/                     # Authentication Module
│   │   ├── screens/
│   │   │   └── LoginScreen.tsx
│   │   └── index.ts
│   │
│   ├── consultation/             # Module 1: Doctor Consultation & Slots
│   │   ├── components/
│   │   │   ├── BookingSummaryCard/
│   │   │   ├── DoctorCard/
│   │   │   ├── DoctorSlotsGrid/
│   │   │   ├── PreConsultationGuidelines/
│   │   │   ├── UpcomingConsultationBanner/
│   │   │   ├── UpcomingSlotHeroCard/
│   │   │   └── index.ts
│   │   ├── screens/
│   │   │   ├── DoctorListings.tsx
│   │   │   ├── DoctorDetailsScreen.tsx
│   │   │   ├── BookingSuccessScreen.tsx
│   │   │   ├── UpcomingSlotScreen.tsx
│   │   │   └── index.ts
│   │   ├── store.ts              # Store re-export for domain encapsulation
│   │   ├── types.ts              # Doctor, Booking, TimeSlot Contracts
│   │   └── index.ts
│   │
│   ├── shop/                     # Module 2: Ayurvedic E-Commerce Store
│   │   ├── components/
│   │   │   ├── CartBadgeButton/
│   │   │   ├── CartItemCard/
│   │   │   ├── FilterModal/
│   │   │   ├── FilterSortBar/
│   │   │   ├── OrderCelebrationHeader/
│   │   │   ├── OrderSummaryCard/
│   │   │   ├── PriceSummaryCard/
│   │   │   ├── ProductCard/
│   │   │   ├── SearchHistoryList/
│   │   │   ├── WishlistBadgeButton/
│   │   │   ├── WishlistModal/
│   │   │   └── index.ts
│   │   ├── hooks/                # Feature-specific custom hooks (useDebounce)
│   │   ├── screens/
│   │   │   ├── ShopScreen.tsx
│   │   │   ├── SearchScreen.tsx
│   │   │   ├── ProductDetailsScreen.tsx
│   │   │   ├── CartScreen.tsx
│   │   │   ├── OrderPlacedScreen.tsx
│   │   │   └── index.ts
│   │   ├── store.ts              # Store re-export for domain encapsulation
│   │   ├── types.ts              # Product, FilterState, CartItem Contracts
│   │   └── index.ts
│   │
│   ├── health-records/           # Module 3: Patient Timeline & Records
│   │   ├── components/
│   │   │   ├── AttachmentModal/  # Modal Viewer for Clinical Docs / PDFs
│   │   │   ├── MonthSectionHeader/# Month & Year Milestones with Count Badge
│   │   │   ├── RecordAttachments/# Document & Image Thumbnail Previews
│   │   │   ├── RecordHeader/     # Type Badge & Formatted Date
│   │   │   ├── RecordTags/       # Interactive Clinical Tag Pills
│   │   │   ├── TimelineCard/     # Decomposed Milestone Card
│   │   │   ├── TimelineNode/     # Type-colored Bullet & Connector Line
│   │   │   ├── TypeFilterBar/    # Horizontal Type Filter Chips
│   │   │   └── index.ts
│   │   ├── screens/
│   │   │   ├── HealthRecordsScreen.tsx
│   │   │   ├── HealthRecordsScreen.styles.ts
│   │   │   └── index.ts
│   │   ├── mockData.ts           # Clinical Records (Lab, Rx, Consult, Vax, Allergy)
│   │   ├── types.ts              # HealthRecord, RecordAttachment Contracts
│   │   └── index.ts
│   │
│   └── index.ts                  # Master Barrel Export for all features
│
├── hooks/                        # Global Custom React Hooks
│   ├── useDebounce.ts            # High-performance search debouncing hook
│   └── index.ts
│
├── services/                     # Device Services, Offline Queues & Persistence
│   ├── apiCache.ts               # TTL-aware In-Memory & MMKV API Caching
│   ├── offlineSync.ts            # Offline Booking/Order FIFO Queues & Sync Engine
│   ├── storage.ts                # MMKV Native Storage Adapter & Search History
│   └── index.ts                  # Clean barrel export (@services)
│
├── store/                        # Global Application State (Zustand)
│   ├── appStore.ts               # Bookings State, Active Appointments & Cancellation
│   ├── cartStore.ts              # Cart Items, Quantity Stepper, Pricing Totals
│   ├── wishlistStore.ts          # Wishlist Sync & Fast Set Operations
│   ├── networkStore.ts           # Connectivity Observer, Pending Sync Counts & Simulator
│   └── index.ts                  # Clean barrel export (@store)
│
├── theme/                        # Design System Tokens & Scalers
│   ├── colors.ts                 # Light & Dark Ayurvedic Palette Tokens
│   ├── typography.ts             # Scalable Font Weights, Sizes & Line Heights
│   ├── spacing.ts                # Responsive Spacing, Radius, Shadow Elevations
│   ├── ThemeContext.tsx          # Dynamic Theme Provider & useTheme Hook
│   └── index.ts
│
└── utils/                        # General Utilities & Shared Helpers
    ├── mockDoctors.ts            # Seed Ayurvedic Doctors dataset
    ├── mockProducts.ts           # Seed Ayurvedic Formulations dataset
    ├── slots.ts                  # Real-time slot generator & time utilities
    ├── strings.ts                # Centralized string dictionary
    └── index.ts
```

---

## 📦 Feature Modules

### 1. Doctor Consultation (`features/consultation`)
- **Doctor Directory**: Filter by specialty (*Panchakarma, Kayachikitsa, Dravyaguna, Shalya Tantra*), experience, and user ratings.
- **Dynamic Slot Allocation**: Real-time slot generation for current time, expiration check, double-booking prevention, and cross-doctor conflict detection.
- **Offline Booking Support**: Reserve slots even when disconnected; bookings are queued into `offline_bookings_queue` and synced upon reconnection.
- **Upcoming Consultation Hub**: Top milestone banner and dedicated upcoming screen with countdown, doctor profile shortcut, cancellation modal, and pre-consultation guidelines.

### 2. Ayurvedic E-Commerce Shop (`features/shop`)
- **Fast Search & Auto-Debounce**: 250ms debounced search filtering across names, benefits, ingredients, and categories.
- **Multi-Faceted Filtering & Sorting**: Combinatorial filtering by **Category** (*Hair, Skin, Digestion, Immunity*), **Dosha Suitability** (*Vata, Pitta, Kapha, Tridosha*), and **In-Stock** availability; sort by *Price (Low/High)* and *Ratings*.
- **Search History**: Instant search history caching powered by MMKV storage.
- **Cart & Wishlist Engine**: Bi-directional quantity synchronization between catalog cards, details screen, and cart drawer.
- **Offline Orders**: Check out seamlessly offline; orders are safely persisted and dispatched when internet returns.
- **Celebration Checkout**: Spring-animated order placement confirmation with detailed item breakdown.

### 3. Patient Health Records Timeline (`features/health-records`)
- **Chronological Timeline**: Vertical connecting lines and circular bullet nodes colored specifically by clinical record type:
  - 🧪 **Lab Report** (`recordLab` / `#00897B`)
  - 💊 **Prescription** (`recordPrescription` / `#1E88E5`)
  - 🩺 **Consultation** (`recordConsultation` / `#3C633E`)
  - 💉 **Vaccination** (`recordVaccination` / `#8E24AA`)
  - ⚠️ **Allergy** (`recordAllergy` / `#E53935`)
- **Month/Year Auto-Grouping**: Dynamically groups records chronologically into month/year sections with total count badges.
- **Interactive Clinical Tags**: Clickable `#tags` (e.g., `#PittaDosha`, `#SkinCare`) that instantly filter the timeline.
- **Document & Image Attachment Previews**: Embedded PDF and micrograph thumbnail previews with modal full-size preview.

---

## 💾 Offline-First Strategy & Synchronization Engine

Amrutam is engineered from the ground up with an **Offline-First** core architecture, ensuring that every healthcare and shopping experience continues smoothly without requiring continuous internet connectivity.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Offline Operations                            │
│  ┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────┐  │
│  │   Cached API Layer    │ │   Offline Cart    │ │  Offline Bookings │  │
│  │   Doctors & Products  │ │   & Order Queue   │ │  & Slot Locking   │  │
│  └───────────┬───────────┘ └─────────┬─────────┘ └─────────┬─────────┘  │
└──────────────┼───────────────────────┼─────────────────────┼────────────┘
               │                       │                     │
┌──────────────▼───────────────────────▼─────────────────────▼────────────┐
│                    Persistent MMKV Storage & Queues                     │
│   • api_cache_doctors / products / health_records (with TTL)            │
│   • offline_bookings_queue (FIFO local queue)                           │
│   • offline_orders_queue (FIFO local queue)                             │
│   • search_history / cart_items                                         │
└──────────────────────────────────────┬──────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────┐
│                   Automatic Background Sync Engine                      │
│   When Network Reconnects (offline ➔ online):                            │
│   1. Dispatches queued offline bookings & orders to Amrutam Cloud       │
│   2. Updates booking records to 'confirmed' (isOfflineQueued: false)    │
│   3. Clears local MMKV sync queues                                      │
│   4. Triggers interactive 'All Bookings & Orders Synced! 🌿' Banner      │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1. High-Performance Native Storage (`src/services/storage.ts`)
- Utilizes **Tencent MMKV** (via `react-native-mmkv`), a high-performance key-value storage engine backed by memory-mapped files (`mmap`).
- **Synchronous read/writes** execute at C++ native speed without bridging serialization overhead, providing instantaneous state hydration on app launch.

### 2. Time-To-Live (TTL) API Cache (`src/services/apiCache.ts`)
- Generic `fetchWithCache<T>(key, fetcher, ttlMs)` manages local caching of doctors, product catalogs, and clinical records.
- If the device is online and cache expired, fresh data is fetched and stored with metadata timestamps.
- If offline, cached records are returned immediately with zero network errors. If cache is empty, it falls back seamlessly to deterministic seed datasets.

### 3. Offline Consultation Bookings Queue (`src/services/offlineSync.ts`)
- Users can schedule doctor appointments without internet.
- Slots are optimistically reserved locally to prevent double booking or slot collision.
- The appointment is tagged `isOfflineQueued: true`, added to `offline_bookings_queue` in MMKV, and the user receives a **"Queued for Auto-Sync 🌿"** celebration confirmation.

### 4. Offline E-Commerce Cart & Checkout Queue (`src/services/offlineSync.ts`)
- Cart state (items, quantities, and price recalculations) is persisted continuously in MMKV.
- When an order is placed offline, it is serialized into `offline_orders_queue` in MMKV and the cart is safely cleared.
- The user is transitioned to the **Order Placed** celebration screen with an offline queued badge indicator.

### 5. Automatic Background Synchronization (`src/store/networkStore.ts`)
- Listens to real-time network connectivity changes via `@react-native-community/netinfo`.
- As soon as connectivity switches from `offline` to `online`, the engine automatically invokes `syncAllPendingData()`:
  1. Iterates through all queued bookings and calls remote booking endpoints.
  2. Dispatches all queued shopping orders to the backend.
  3. Updates booking status from `isOfflineQueued: true` to `confirmed` in `appStore`.
  4. Clears local MMKV queues and displays an interactive sync toast notification.
- Includes an **in-app network simulation toggle** allowing instant testing and demonstration of offline flows on simulators.

---

## 🎨 Architectural Decisions & Design System

### 1. Zero Hardcoding Policy
- **No Hardcoded Strings**: All UI copy, screen titles, accessibility labels, error alerts, and month names are stored in `STRINGS` (`src/constants/strings.ts`). This guarantees consistency and prepares the app for effortless internationalization (i18n).
- **No Hardcoded Colors**: All colors are accessed through `useTheme()` tokens (`theme.colors.primary`, `theme.colors.surface`, `theme.colors.border`, etc.). Dark and light modes switch smoothly without manual overrides.
- **No Magic Numbers**: All dimensions and paddings leverage `spacing.*`, `radius.*`, and `react-native-size-matters` responsive utilities (`ms`, `vs`, `s`).

### 2. Component Decomposition
Complex cards (such as `TimelineCard` and `UpcomingSlotHeroCard`) are broken down into single-responsibility sub-components:
- `TimelineNode`: Handles line geometry and icon rendering.
- `RecordHeader`: Renders category badge and formatted timestamp.
- `RecordTags`: Manages chip wrapping and selection callbacks.
- `RecordAttachments`: Renders document attachment pills with file size indicators.

### 3. Responsive Scaling & Fluid Layouts
- Spacing, fonts, and elevations are calculated using `ms(value)` (Moderate Scale) and `vs(value)` (Vertical Scale) to maintain aesthetic proportions across small Android devices, iPhones, and tablets.

---

## ⚡ State Management Choice

We selected **Zustand** as the primary state management engine for the following technical reasons:

| Criteria | Zustand | Redux Toolkit | Context API |
| :--- | :---: | :---: | :---: |
| **Bundle Size** | **~1.1 KB** | ~40 KB | Native (0 KB) |
| **Boilerplate** | **Minimal** (Single Hook) | High (Reducers, Slices, Actions) | Moderate |
| **Re-render Optimization** | **Selective Subscriptions** (`useStore(s => s.item)`) | Good (Selector-based) | Poor (Triggers on any context change) |
| **Outside React Access** | **Supported** (`getState()`, `setState()`) | Supported | Not Supported |
| **Native Storage Sync** | **Seamless** with MMKV | Requires Redux Persist | Custom useEffect logic |

### Store Implementation
1. **`appStore.ts`**: Maintains booked consultation slots, active appointments, and cancellation lifecycles.
2. **`cartStore.ts`**: Manages cart items, quantity increments/decrements, removal, and calculated totals (`itemsSubtotal`, `totalAmount`).
3. **`wishlistStore.ts`**: Manages wishlist set operations with fast $O(1)$ lookups.
4. **`networkStore.ts`**: Tracks online/offline status, pending sync queue counts, and coordinates sync triggers.

---

## 🚀 Performance Optimizations

1. **Recycled List Rendering with `@shopify/flash-list`**:
   - Used for product catalogs and doctor listings instead of standard `FlatList`. FlashList recycles views directly instead of unmounting/mounting DOM trees, reducing memory consumption by up to 50% and guaranteeing 60-120 FPS scrolling.

2. **Render Pass Optimization**:
   - All atomic UI components and list items are wrapped with `React.memo`.
   - Prop callbacks (`onPress`, `onTagPress`, `onSelectSlot`) are wrapped with `useCallback` to prevent unnecessary component invalidations.
   - Filter and grouping pipelines (such as timeline month-year grouping) are wrapped with `useMemo`.

3. **Debounced Live Filtering**:
   - The `useDebounce` hook buffers search queries by **250ms**, ensuring that search filter executions only run after user input pauses, preventing UI thread stutters.

4. **Hardware-Accelerated Native Driver Animations**:
   - All screen transitions, celebratory checkmarks, and modal sheets utilize `useNativeDriver: true` with `Animated.spring` and `Animated.timing` to execute entirely on the UI thread without crossing the React Native bridge.

---

## ⚖️ Trade-offs Made

1. **Zustand + MMKV vs SQLite Relational DB**:
   - *Decision*: Used Zustand with MMKV rather than SQLite / WatermelonDB.
   - *Rationale*: For a mobile client of this scale, an in-memory reactive store backed by fast key-value persistence provides sub-millisecond response times with significantly less schema migration overhead.
   - *Trade-off*: Complex relational joins on tens of thousands of records would require full database integration in future phases.

2. **Client-side Mock Data vs API Mock Server**:
   - *Decision*: Embedded strongly-typed mock datasets in `mockDoctors.ts`, `mockProducts.ts`, and `mockData.ts`.
   - *Rationale*: Ensures complete offline determinism, eliminates network flake during development/testing, and provides consistent data contracts matching real-world Ayurvedic products and doctor profiles.

3. **Modal Sheets vs Native Navigation Screens**:
   - *Decision*: Filter controls, wishlist view, and attachment previews are presented via lightweight modal sheets instead of pushing new navigation routes.
   - *Rationale*: Preserves user scroll position, search queries, and context without requiring round-trip route param serialization.

---

## 🔮 Future Improvements

- [ ] **WebRTC Video Consultation**: Real-time peer-to-peer encrypted video calling directly inside the app for scheduled doctor slots.
- [ ] **Prescription OCR Scanner**: Camera integration using ML Kit / Vision AI to scan physical paper prescriptions and auto-populate the health timeline.
- [ ] **Dosha Quiz Engine**: Interactive Prakriti & Vikriti diagnostic questionnaire that recommends personalized diet plans and herbal supplements.
- [ ] **Push Notification Reminders**: Native notification triggers for medicine dosage schedules and 10-minute pre-consultation alerts.
- [ ] **Payment Gateway Integration**: Direct UPI, NetBanking, and Card checkout integration (Razorpay / Stripe SDK).
- [ ] **Localization (i18n)**: Expansion of `STRINGS` into multi-language JSON bundles (Hindi, Sanskrit, Gujarati, Tamil, etc.).

---

## 🛠 Setup & Running Locally

### Prerequisites
- Node.js >= 18
- JDK 17
- Android Studio & Android SDK (for Android)
- Xcode & CocoaPods (for iOS on macOS)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/Ayaan22/Amrutam.git
cd Amrutam

# 2. Install dependencies
npm install

# 3. iOS Pods Installation (macOS only)
cd ios && pod install && cd ..
```

### Running on Device / Simulator

```bash
# Start Metro bundler with cache reset
npm start -- --reset-cache

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Code Quality & Automated Test Suite

```bash
# 1. Run Jest Unit Test Suite (6 test suites, 31 tests passing)
npm test

# 2. Run TypeScript compilation check (0 errors)
npx tsc --noEmit

# 3. Run ESLint code quality check (0 errors, 0 warnings)
npm run lint
```

**Unit Test Breakdown:**
- `src/services/__tests__/offlineSync.test.ts`: Offline consultation & order queue FIFO operations, queue clearing, and sync orchestration.
- `src/services/__tests__/apiCache.test.ts`: Generic API caching, TTL expiration handling, and offline fallback mechanisms.
- `src/store/__tests__/cartStore.test.ts`: Cart item modifications, quantity stepper math, and price subtotal calculators.
- `src/store/__tests__/wishlistStore.test.ts`: Wishlist toggling, state idempotency, and item removal.
- `src/store/__tests__/consultationStore.test.ts`: Booking slot creation, duplicate detection, and cancellation lifecycles.
- `src/hooks/__tests__/useDebounce.test.tsx`: Search query timer debouncing and rapid input stabilization.

---

<div align="center">
  <sub>Built with 💚 for <b>Amrutam Ayurveda</b></sub>
</div>
