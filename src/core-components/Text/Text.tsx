import React, { memo } from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../theme';
import { TextProps } from './Text.types';
import { createStyles, getTextColor } from './Text.styles';

export const Text: React.FC<TextProps> = memo(({
  variant = 'body',
  color = 'primary',
  align,
  style,
  children,
  ...rest
}) => {
  const { colors, typography } = useTheme();
  const styles = createStyles(typography);

  const textColor = getTextColor(color, colors);

  return (
    <RNText
      style={[
        styles[variant],
        { color: textColor },
        align ? { textAlign: align } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
});

Text.displayName = 'Text';
