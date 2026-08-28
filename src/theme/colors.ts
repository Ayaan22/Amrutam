export const lightColors = {
  // Brand Ayurvedic Tones
  primary: '#3C633E',           // Ayurvedic Forest Green
  primaryLight: '#EBF4EA',      // Soft Herb Green tint
  primaryDark: '#2B4A2D',       // Deep Moss Green
  primaryMuted: '#6B8E65',      // Muted Sage Green
  
  accent: '#C68B59',            // Warm Ayurvedic Sandalwood Gold
  accentLight: '#FAF3EB',       // Pale Sandalwood tint
  accentDark: '#8F5726',        // Deep Terracotta Sandalwood
  
  // Surfaces & Backgrounds
  background: '#F8FAF7',        // Organic cream-white background
  surface: '#FFFFFF',           // Crisp White Card surface
  surfaceElevated: '#FFFFFF',   // Floating modals & sheets
  surfaceSubtle: '#F2F6F0',     // Subtle container fill
  border: '#E1E9DF',            // Soft herbal border line
  borderLight: '#EDF2EC',       // Very subtle separator
  divider: '#E7ECE5',
  
  // Typography
  textPrimary: '#172416',       // Deep botanical slate
  textSecondary: '#526351',     // Medium herbal slate
  textMuted: '#849683',         // Muted caption grey
  textInverse: '#FFFFFF',       // Contrast white
  
  // Feedback & Status
  success: '#2E7D32',
  successLight: '#E8F5E9',
  warning: '#ED6C02',
  warningLight: '#FFF4E5',
  error: '#D32F2F',
  errorLight: '#FFEBEE',
  info: '#0288D1',
  infoLight: '#E1F5FE',

  // Ayurvedic Dosha Spectrum
  vata: '#5C6BC0',              // Air & Ether (Lavender Slate)
  vataLight: '#EDE7F6',
  pitta: '#E65100',             // Fire & Water (Warm Saffron)
  pittaLight: '#FFF3E0',
  kapha: '#2E7D32',             // Earth & Water (Leaf Green)
  kaphaLight: '#E8F5E9',
  tridosha: '#7B1FA2',          // Equilibrium (Royal Herbal Plum)
  tridoshaLight: '#F3E5F5',

  // Health Record Types
  recordLab: '#00897B',
  recordPrescription: '#1E88E5',
  recordConsultation: '#3C633E',
  recordVaccination: '#8E24AA',
  recordAllergy: '#E53935',
};

export const darkColors = {
  // Brand Ayurvedic Tones (Night Mode)
  primary: '#68B061',           // Luminous Herbal Green
  primaryLight: '#182C16',      // Dark Forest container
  primaryDark: '#8CD884',
  primaryMuted: '#4F6B4C',
  
  accent: '#E0A977',            // Radiant Sandalwood
  accentLight: '#302114',
  accentDark: '#F5C69C',
  
  // Surfaces & Backgrounds
  background: '#101710',        // Deep forest shadow background
  surface: '#182218',           // Dark botanical card surface
  surfaceElevated: '#202D20',   // Floating modals & sheets
  surfaceSubtle: '#141D14',     // Dark container fill
  border: '#273827',            // Dark herbal border
  borderLight: '#1E2C1E',
  divider: '#223222',
  
  // Typography
  textPrimary: '#EAF3EA',       // Clean bright text
  textSecondary: '#A0B59F',     // Soft muted green-grey
  textMuted: '#687E67',         // Low-emphasis caption
  textInverse: '#101710',       // Dark on light elements
  
  // Feedback & Status
  success: '#81C784',
  successLight: '#1B331E',
  warning: '#FFB74D',
  warningLight: '#3D2808',
  error: '#E57373',
  errorLight: '#3A1414',
  info: '#64B5F6',
  infoLight: '#0E2C3D',

  // Ayurvedic Dosha Spectrum
  vata: '#9FA8DA',
  vataLight: '#262438',
  pitta: '#FFAB91',
  pittaLight: '#3B2016',
  kapha: '#A5D6A7',
  kaphaLight: '#19331C',
  tridosha: '#CE93D8',
  tridoshaLight: '#341A3D',

  // Health Record Types
  recordLab: '#4DB6AC',
  recordPrescription: '#64B5F6',
  recordConsultation: '#81C784',
  recordVaccination: '#BA68C8',
  recordAllergy: '#EF5350',
};

export type ColorTokens = typeof lightColors;
