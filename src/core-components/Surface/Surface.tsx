import React, { memo } from 'react';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { SurfaceProps } from './Surface.types';
import { styles } from './Surface.styles';

const DEFAULT_EDGES: readonly Edge[] = ['top', 'bottom', 'left', 'right'];

export const Surface: React.FC<SurfaceProps> = memo(({
  children,
  edges = DEFAULT_EDGES,
  backgroundColor,
  style,
  ...rest
}) => {
  const { colors } = useTheme();
  const bg = backgroundColor || colors.background;

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor: bg }, style]}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
});

Surface.displayName = 'Surface';
