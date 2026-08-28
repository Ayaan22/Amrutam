import React, { memo, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '../../theme';
import { InputProps } from './Input.types';
import { createStyles } from './Input.styles';

export const Input: React.FC<InputProps> = memo(({
  label,
  placeholder,
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  accessibilityLabel,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error ? styles.inputWrapperError : undefined,
          disabled ? styles.inputWrapperDisabled : undefined,
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={accessibilityLabel || label || placeholder}
          accessibilityState={{ disabled }}
          style={[
            styles.input,
            disabled ? styles.inputDisabled : undefined,
            inputStyle,
          ]}
          {...rest}
        />

        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
});

Input.displayName = 'Input';
