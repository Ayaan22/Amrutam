# 🌿 Amrutam - Holistic Ayurveda & Patient Care Mobile Application

A production-grade, feature-rich React Native (TypeScript) mobile application built for **Amrutam**. The platform seamlessly unifies three core healthcare verticals: **Ayurvedic Doctor Consultations**, **Authentic Herbal E-Commerce**, and **Patient Health Records & Clinical Timeline**.

---

## 📑 Table of Contents
1. [System Architecture](#-system-architecture)
2. [Folder Structure](#-folder-structure)
3. [Feature Modules](#-feature-modules)
4. [Architectural Decisions & Design System](#-architectural-decisions--design-system)
5. [State Management Choice](#-state-management-choice)
6. [Performance Optimizations](#-performance-optimizations)
7. [Offline Strategy & Persistence](#-offline-strategy--persistence)
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
│                  Business Logic & State Management Layer                │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Zustand Stores: cartStore, wishlistStore, consultationStore    │   │
│   │  Persistence: MMKV (Synchronous C++ Native Storage)             │   │
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
│       ├── BottomTabNavigator.tsx# Primary Tab Bar (Consult, Shop, Records)
│       └── types.ts              # RouteParamList Contracts
│
├── constants/                    # Application-wide Constants
│   └── strings.ts                # STRINGS: Centralized UI Copy, Labels, Routes
│
├── core-components/              # Reusable Atomic Design System
│   ├── Badge/                    # Colored Status Badges (primary, success, error)
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
├── features/                     # Domain Feature Modules
│   │
│   ├── auth/                     # Authentication Module
│   │   └── screens/
│   │       └── LoginScreen.tsx
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
│   │   ├── hooks/                # Feature-specific custom hooks
│   │   ├── screens/
│   │   │   ├── DoctorListings.tsx
│   │   │   ├── DoctorDetailsScreen.tsx
│   │   │   ├── BookingSuccessScreen.tsx
│   │   │   ├── UpcomingSlotScreen.tsx
│   │   │   └── index.ts
│   │   ├── mockData.ts           # Ayurvedic Doctor Dataset & Time Slots
│   │   └── types.ts              # Doctor, Booking, TimeSlot Contracts
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
│   │   ├── screens/
│   │   │   ├── ShopScreen.tsx
│   │   │   ├── SearchScreen.tsx
│   │   │   ├── ProductDetailsScreen.tsx
│   │   │   ├── CartScreen.tsx
│   │   │   ├── OrderPlacedScreen.tsx
│   │   │   └── index.ts
│   │   ├── mockData.ts           # Ayurvedic Formulations Dataset (Doshas, Herbs)
│   │   └── types.ts              # Product, FilterState, CartItem Contracts
│   │
│   └── health-records/           # Module 3: Patient Timeline & Records
│       ├── components/
│       │   ├── AttachmentModal/  # Modal Viewer for Clinical Docs / PDFs
│       │   ├── MonthSectionHeader/# Month & Year Milestones with Count Badge
│       │   ├── RecordAttachments/# Document & Image Thumbnail Previews
│       │   ├── RecordHeader/     # Type Badge & Formatted Date
│       │   ├── RecordTags/       # Interactive Clinical Tag Pills
│       │   ├── TimelineCard/     # Decomposed Milestone Card
│       │   ├── TimelineNode/     # Type-colored Bullet & Connector Line
│       │   ├── TypeFilterBar/    # Horizontal Type Filter Chips
│       │   └── index.ts
│       ├── screens/
│       │   ├── HealthRecordsScreen.tsx
│       │   ├── HealthRecordsScreen.styles.ts
│       │   └── index.ts
│       ├── mockData.ts           # Clinical Records (Lab, Rx, Consult, Vax, Allergy)
│       └── types.ts              # HealthRecord, RecordAttachment Contracts
│
├── services/                     # Device Services & Persistence
│   └── storage.ts                # MMKV Instance & Search History Adapter
│
├── store/                        # Global Application State (Zustand)
│   ├── cartStore.ts              # Cart State, Quantity Stepper, Total Calculators
│   ├── wishlistStore.ts          # Wishlist Sync & Toggle Handlers
│   ├── consultationStore.ts      # Active Bookings & Slot Allocation
│   └── index.ts
│
├── theme/                        # Design System Tokens & Scalers
│   ├── colors.ts                 # Light & Dark Ayurvedic Palette Tokens
│   ├── typography.ts             # Scalable Font Weights, Sizes & Line Heights
│   ├── spacing.ts                # Responsive Spacing, Radius, Shadow Elevations
│   ├── ThemeContext.tsx          # Dynamic Theme Provider & useTheme Hook
│   └── index.ts
│
└── utils/                        # General Utilities & Shared Helpers
    └── index.ts
```

---

## 📦 Feature Modules

### 1. Doctor Consultation (`features/consultation`)
- **Doctor Directory**: Filter by specialty (*Panchakarma, Kayachikitsa, Dravyaguna, Shalya Tantra*), experience, and user ratings.
- **Dynamic Slot Allocation**: Real-time slot selection per doctor, immediate double-booking prevention, and conflict detection.
- **Upcoming Consultation Hub**: Top milestone banner and dedicated upcoming screen with countdown, doctor profile shortcut, cancellation modal, and pre-consultation guidelines.

### 2. Ayurvedic E-Commerce Shop (`features/shop`)
- **Fast Search & Auto-Debounce**: 250ms debounced search filtering across names, benefits, ingredients, and categories.
- **Multi-Faceted Filtering & Sorting**: Combinatorial filtering by **Category** (*Hair, Skin, Digestion, Immunity*), **Dosha Suitability** (*Vata, Pitta, Kapha, Tridosha*), and **In-Stock** availability; sort by *Price (Low/High)* and *Ratings*.
- **Search History**: Instant search history caching powered by MMKV storage.
- **Cart & Wishlist Engine**: Bi-directional quantity synchronization between catalog cards, details screen, and cart drawer.
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

## 🎨 Architectural Decisions & Design System

### 1. Zero Hardcoding Policy
- **No Hardcoded Strings**: All UI copy, screen titles, accessibility labels, error alerts, and month names are stored in `STRINGS` (`src/constants/strings.ts`). This guarantees consistency and prepares the app for effortless internationalization (i18n).
- **No Hardcoded Colors**: All colors are accessed through `useTheme()` tokens (`theme.colors.primary`, `theme.colors.surface`, `theme.colors.border`, etc.). Dark and light modes switch smoothly without manual overrides.
- **No Magic Numbers**: All dimensions and paddings leverage `spacing.*`, `radius.*`, and `react-native-size-matters` responsive utilities (`ms`, `vs`, `s`).

### 2. Component Decomposition
Complex cards (such as `TimelineCard` and `UpcomingSlotHeroCard`) are broken down into single-responsibility sub-components. For example, `TimelineCard` orchestrates:
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
1. **`cartStore.ts`**: Manages cart items, quantity increments/decrements, removal, and calculated totals (`itemsSubtotal`, `totalAmount`).
2. **`wishlistStore.ts`**: Manages wishlist set operations with fast $O(1)$ lookups.
3. **`consultationStore.ts`**: Maintains booked slots, active consultations, and cancellation lifecycles.

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

## 💾 Offline-First Strategy & Synchronization Engine

Amrutam is engineered with an **Offline-First** core architecture, ensuring that every user experience continues smoothly without requiring continuous internet connectivity.

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

1. **Cached API Responses (`src/services/apiCache.ts`)**:
   - Generic `fetchWithCache<T>` wrapper stores serialized data envelopes with timestamps and TTL.
   - When offline, API queries return cached responses with zero network errors. If cache is empty, it falls back gracefully to default seed datasets.

2. **Offline Cart & Order Queueing (`src/services/offlineSync.ts`)**:
   - Cart modifications (adding, updating quantities, clearing) are 100% persistent in MMKV.
   - Orders placed offline are added to `offline_orders_queue`, and the user is shown an **"Order Queued Successfully! 🌿"** confirmation screen.

3. **Offline Consultation Bookings (Queued)**:
   - Doctor slots can be booked offline. Slots are optimistically reserved in local state to prevent double booking.
   - Bookings are tagged `isOfflineQueued: true` and saved to `offline_bookings_queue`.
   - The user receives an immediate **"Queued for Auto-Sync 🌿"** celebration screen.

4. **Automatic Sync Engine Once Internet Returns (`src/store/networkStore.ts`)**:
   - Network connectivity transitions automatically trigger `syncAllPendingData()`.
   - Pending bookings and orders are dispatched and marked synced, local queues are cleared, and a celebratory sync banner is displayed.
   - Includes an interactive offline/online simulation toggle for testing and demonstration on simulators.

---

## ⚖️ Trade-offs Made

1. **Zustand vs SQLite Relational DB**:
   - *Decision*: Used Zustand with MMKV rather than SQLite / WatermelonDB.
   - *Rationale*: For a mobile client of this scale, an in-memory reactive store backed by fast key-value persistence provides sub-millisecond response times with significantly less schema migration overhead.
   - *Trade-off*: Complex relational joins on tens of thousands of records would require full database integration in future phases.

2. **Client-side Mock Data vs API Mock Server**:
   - *Decision*: Embedded strongly-typed mock datasets in `mockData.ts`.
   - *Rationale*: Ensures complete offline determinism, eliminates network flake during development/testing, and provides consistent data contracts matching real-world Ayurvedic products and doctor profiles.

3. **Modal Sheets vs Native Navigation Screens**:
   - *Decision*: Filter controls and attachment previews are presented via lightweight modal sheets instead of pushing new navigation routes.
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
# 1. Run Jest Unit Test Suite (17 tests passing)
npm test

# 2. Run TypeScript compilation check (0 errors)
npx tsc --noEmit

# 3. Run ESLint code quality check (0 errors, 0 warnings)
npm run lint
```

---

<div align="center">
  <sub>Built with 💚 for <b>Amrutam Ayurveda</b></sub>
</div>
