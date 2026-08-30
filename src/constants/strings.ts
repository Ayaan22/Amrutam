export const STRINGS = {
  common: {
    appName: 'Amrutam',
    currencySymbol: '₹',
    loading: 'Loading...',
    seeAll: 'See All',
    retry: 'Retry',
    search: 'Search',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    done: 'Done',
    ok: 'OK',
    ratingStar: '★',
    clear: 'Clear',
    filter: 'Filter',
    all: 'All',
    yearsExp: 'Years Exp.',
    close: 'Close',
    clearSearch: 'Clear search text',
    filterOptions: 'Filter options',
  },

  navigation: {
    routes: {
      auth: 'Auth',
      app: 'App',
      mainTabs: 'MainTabs',
      login: 'Login',
      consult: 'Consult',
      shop: 'Shop',
      healthRecords: 'HealthRecords',
      doctorDetails: 'DoctorDetails',
      bookingSuccess: 'BookingSuccess',
      upcomingSlot: 'UpcomingSlot',
      search: 'Search',
      productDetails: 'ProductDetails',
      cart: 'Cart',
      orderPlaced: 'OrderPlaced',
    },
    tabs: {
      consult: 'Consult',
      shop: 'Shop',
      healthRecords: 'Health Records',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      forgotPassword: 'Forgot Password',
    },
  },

  auth: {
    welcomeTitle: 'Welcome to Amrutam',
    welcomeSubtitle: 'Your holistic Ayurvedic healthcare companion',
    signInCta: 'Sign In',
    signUpCta: 'Sign Up',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
  },

  consultation: {
    title: 'Ayurvedic Doctors',
    subtitle: 'Consult verified Vaidyas & Ayurvedic practitioners',
    searchPlaceholder: 'Search doctors, specialties...',
    bookCta: 'Book',
    bookConsultationCta: 'Book Consultation',
    feeLabel: 'Consultation Fee',
    bookingAlertTitle: 'Book Consultation',
    bookingAlertMessage: (doctorName: string, fee: number) =>
      `Booking appointment with ${doctorName} for ₹${fee}.`,
    specialties: {
      all: 'All',
      panchakarma: 'Panchakarma',
      digestiveHealth: 'Digestive Health',
      skinAndHair: 'Skin & Hair',
      kayachikitsa: 'Kayachikitsa',
      womensHealth: "Women's Health",
      nadiPariksha: 'Nadi Pariksha',
    },
    doctorsCountLabel: (count: number) =>
      `${count} ${count === 1 ? 'Doctor' : 'Doctors'} Available`,
    emptyState: {
      title: 'No Doctors Found',
      description:
        'Try searching with a different name, specialty, or clear filters.',
      resetAction: 'Reset Search',
    },
    doctorDetails: {
      headerTitle: 'Doctor Profile',
      aboutSection: 'About Doctor',
      specialtiesSection: 'Specialties',
      languagesSection: 'Languages Spoken',
      experienceSection: 'Clinical Experience',
      todaySlotsSection: "Today's Available Slots",
      slotExpiredBadge: 'Expired',
      slotBookedBadge: 'Booked',
      slotMandatoryError: 'Please select an available time slot to proceed.',
      slotExpiredError:
        'This time slot has expired. Please choose a future time slot.',
      doubleBookingError:
        'This time slot is already booked for this doctor. Please choose a different slot.',
      slotConflictError: (doctorName: string, time: string) =>
        `Schedule Conflict: You already have a consultation scheduled with ${doctorName} at ${time}. Please choose another time slot.`,
      bookNowCta: 'Book Now',
      bookingSuccessTitle: 'Appointment Confirmed! 🌿',
      bookingSuccessMessage: (doctorName: string, time: string) =>
        `Your Ayurvedic consultation with ${doctorName} has been booked for Today at ${time}.`,
    },
    bookingSuccess: {
      title: 'Booking Confirmed!',
      subtitle:
        'Your Ayurvedic consultation has been successfully scheduled with our Vaidya.',
      badgeLabel: '🌿 Confirmed Slot',
      offlineQueuedBadge: '🌿 Queued for Auto-Sync',
      offlineQueuedSubtitle:
        'Your slot is reserved locally and will automatically synchronize with Amrutam Cloud as soon as internet connection is restored.',
      confirmedStatus: 'Confirmed',
      queuedStatus: 'Queued (Offline)',
      consultingVaidya: 'Consulting Vaidya',
      scheduledDate: 'Appointment Date',
      scheduledTime: 'Time Slot',
      consultationMode: 'Consultation Mode',
      modeValue: '1-on-1 HD Video Call',
      bookingIdLabel: 'Booking Reference',
      viewUpcomingCta: 'View Upcoming Consultation',
      redirectNotice: 'Redirecting to your upcoming schedule...',
    },
    upcomingSlot: {
      headerTitle: 'Upcoming Consultations',
      statusBadge: '🌿 Confirmed & Upcoming',
      emptyTitle: 'No Upcoming Consultations',
      emptyDescription:
        'You do not have any scheduled appointments. Explore our verified Vaidyas to book a consultation.',
      findDoctorsCta: 'Book a Consultation',
      cancelBookingCta: 'Cancel Booking',
      cancelModalTitle: 'Cancel Consultation?',
      cancelModalMessage: (doctorName: string) =>
        `Are you sure you want to cancel your scheduled appointment with ${doctorName}? This slot will be released for other patients.`,
      keepAppointment: 'Keep Appointment',
      confirmCancel: 'Yes, Cancel',
      cancelledSuccessAlert:
        'Your consultation has been successfully cancelled and removed.',
      joinCallCta: 'Join Video Consultation',
      joinCallHint: 'Meeting room opens 10 minutes before your slot',
      instructionsTitle: 'Pre-Consultation Guidelines',
      instruction1: 'Have your past Ayurvedic or medical reports handy.',
      instruction2:
        'Sit in a quiet, well-lit room 5 minutes prior to the session.',
      instruction3:
        'The Vaidya will review your Prakriti, Vikriti & current symptoms.',
      doctorDetailsCta: 'View Doctor Profile',
    },
  },

  shop: {
    title: 'Ayurvedic Shop',
    subtitle: 'Pure herbal formulations, natural remedies & wellness products',
    searchPlaceholder: 'Search authentic herbs, remedies...',
    searchHeaderTitle: 'Search Ayurvedic Remedies',
    resultsCount: (count: number, query?: string) =>
      query
        ? `Showing ${count} ${
            count === 1 ? 'product' : 'products'
          } for "${query}"`
        : `${count} Ayurvedic ${
            count === 1 ? 'Product' : 'Products'
          } Available`,
    trendingSearches: 'Popular Herbal Searches',
    categoriesTitle: 'Browse Categories',
    featuredTitle: 'Featured Herbal Formulations',
    featuredDescription:
      'Clinically validated Ayurvedic supplements sourced directly from nature.',
    addToCartCta: 'Add to Cart',
    buyNowCta: 'Buy Now',
    addedToCartSuccess: (productName: string) =>
      `${productName} added to your wellness cart! 🌿`,
    emptySearch: {
      title: 'No Herbal Products Found',
      description:
        'We could not find any products matching your search. Try searching for "Bhringraj", "Oil", "Malt", or "Skin".',
      resetAction: 'Clear Search',
    },
    search: {
      recentSearchesTitle: 'RECENT SEARCHES',
      clearAllHistoryCta: 'Clear All',
      emptyHistoryPrompt:
        'Search for authentic Ayurvedic remedies, oils, and herbal formulations.',
    },
    wishlist: {
      headerTitle: (count: number) => `My Wishlist (${count})`,
      emptyTitle: 'Your Wishlist is Empty',
      emptyDescription:
        'Save your favorite Ayurvedic formulations, oils, and remedies here.',
      exploreCta: 'Explore Products',
      moveToCart: 'Move to Cart',
      removeFromWishlist: 'Remove from wishlist',
      addedSuccess: (name: string) => `${name} added to your wishlist! 💚`,
      removedSuccess: (name: string) => `${name} removed from your wishlist.`,
    },
    sort: {
      title: 'Sort By',
      featured: 'Featured',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      rating: 'Customer Rating',
    },
    filters: {
      title: 'Filter & Sort',
      categories: 'Categories',
      doshas: 'Dosha Balancing',
      availability: 'Availability',
      inStockOnly: 'In Stock Only',
      resetAll: 'Reset All',
      applyFilters: (count: number) => `Apply Filters (${count})`,
      allDoshas: 'All Doshas',
    },
    pagination: {
      loadMore: 'Load More Products',
      loadingMore: 'Loading more formulations...',
      allLoaded: 'You have viewed all formulations 🌿',
    },
    productDetails: {
      headerTitle: 'Product Details',
      ingredientsTitle: 'Key Ayurvedic Ingredients',
      benefitsTitle: 'Key Health Benefits',
      dosageTitle: 'How to Use',
      doshaTitle: 'Dosha Balancing',
      aboutTitle: 'Product Details',
      freeDeliveryBadge: 'Free Delivery Available',
      authenticBadge: '100% Authentic Ayurveda',
      quantityLabel: 'Quantity',
      totalPrice: 'Total Price',
      inCartBadge: 'In Cart',
      goToCartCta: 'Go to Cart',
    },
    cart: {
      headerTitle: (count: number) => `My Wellness Cart (${count})`,
      clearCartCta: 'Clear',
      emptyTitle: 'Your Cart is Empty',
      emptyDescription:
        "Looks like you haven't added any herbal formulations or remedies to your cart yet.",
      emptyAction: 'Explore Ayurvedic Shop',
      priceSummaryTitle: 'Price Summary',
      itemsSubtotalLabel: (count: number) => `Items Subtotal (${count})`,
      packagingLabel: 'Ayurvedic Eco Packaging',
      freeBadge: 'FREE',
      totalAmountLabel: 'Total Amount',
      totalPayableLabel: 'Total Payable',
      placeOrderCta: 'Place Order 🌿',
      addedToCartAlertTitle: 'Added to Cart 🌿',
      addedToCartAlertMessage: (quantity: number, productName: string) =>
        `${quantity}x ${productName} has been added to your cart.`,
      keepBrowsingCta: 'Keep Browsing',
      viewCartCta: 'View Cart',
      decreaseQuantity: 'Decrease quantity',
      increaseQuantity: 'Increase quantity',
    },
    orderPlaced: {
      confirmedBadge: '🌿 Order Confirmed',
      offlineQueuedBadge: '🌿 Queued for Auto-Sync',
      title: 'Order Placed Successfully!',
      offlineTitle: 'Order Queued Successfully!',
      subtitle:
        'Thank you for trusting Amrutam Ayurveda. Your formulations are being packed with authentic Vedic herbs.',
      offlineSubtitle:
        'Your order has been recorded locally and will automatically synchronize with Amrutam Cloud as soon as your internet connection is restored.',
      orderReferenceLabel: 'Order Reference',
      confirmedStatus: 'Confirmed',
      offlineStatus: 'Queued (Offline)',
      totalItemsLabel: 'Total Items',
      itemsCountLabel: (count: number) =>
        `${count} ${count === 1 ? 'Product' : 'Products'}`,
      totalPaidLabel: 'Total Amount Paid',
      estimatedDeliveryLabel: 'Estimated Delivery',
      deliveryTimeline: '3 - 5 Business Days',
      qualityAssuranceText:
        '100% Classical Preparation • Free from parabens & mineral oils • Certified GMP Quality',
      continueShoppingCta: 'Continue Shopping 🌿',
    },
  },

  healthRecords: {
    title: 'Health Records',
    subtitle: 'Patient Timeline & Health Records',
    searchPlaceholder: 'Search records, doctors, tags...',
    allRecords: 'All Records',
    types: {
      all: 'All Records',
      labReport: 'Lab Reports',
      prescription: 'Prescriptions',
      consultation: 'Consultations',
      vaccination: 'Vaccinations',
      allergy: 'Allergies',
    },
    filteredByTag: 'Filtered by tag:',
    recordsCount: (count: number) =>
      `${count} ${count === 1 ? 'Record' : 'Records'}`,
    emptyTitle: 'No Records Found',
    emptySubtitle:
      'No health records match your current search or filter criteria.',
    clearFilters: 'Clear Filters',
    attachments: {
      pdfDocument: 'PDF Document',
      medicalImage: 'Medical Image',
      verifiedNotice: 'Verified Amrutam Clinical Document Preview',
      closePreview: 'Close preview',
      previewPdf: 'Preview PDF',
      viewImage: 'View Image',
    },
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },

  emptyState: {
    defaultTitle: 'Nothing here yet',
    defaultDescription: 'There is no data available to display right now.',
    defaultAction: 'Refresh',
  },

  errorState: {
    defaultTitle: 'Something went wrong',
    defaultDescription: 'An unexpected error occurred. Please try again.',
    defaultAction: 'Retry',
  },

  errorBoundary: {
    title: 'Oops! Something went wrong',
    subtitle:
      'We encountered an unexpected error while loading this view. Please try recovering or restarting.',
    recoverAction: 'Try Again',
    contactSupport: 'Need assistance? Reach out to Amrutam Care.',
  },

  offlineNotice: {
    offlineMessage:
      'You are offline • Browsing cached Ayurvedic records & remedies',
    syncingMessage:
      'Syncing offline bookings & orders with Amrutam Cloud... 🔄',
    syncSuccessMessage: 'All offline bookings & orders synced! 🌿',
    onlineRestored: 'Internet connection restored 🌿',
    toggleNetwork: 'Simulate Offline / Online',
    goOnline: 'Go Online',
  },
} as const;
