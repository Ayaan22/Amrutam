import React, { Component, ErrorInfo } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext, ThemeContextType, defaultTheme } from '../../theme/ThemeContext';
import { STRINGS } from '../../constants/strings';
import { Button } from '../Button';
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';
import { createStyles } from './ErrorBoundary.styles';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static contextType = ThemeContext;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (__DEV__) {
      console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (!hasError) {
      return children;
    }

    if (fallback && error) {
      return fallback(error, this.handleReset);
    }

    const theme = (this.context as ThemeContextType) || defaultTheme;
    const styles = createStyles(theme);

    return (
      <View style={styles.container}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={42}
            color={theme.colors.error}
          />
        </View>

        <Text style={styles.title}>{STRINGS.errorBoundary.title}</Text>
        <Text style={styles.subtitle}>{STRINGS.errorBoundary.subtitle}</Text>

        {__DEV__ && error?.message && (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorText} numberOfLines={3}>
              {error.message}
            </Text>
          </View>
        )}

        <Button
          variant="primary"
          title={STRINGS.errorBoundary.recoverAction}
          onPress={this.handleReset}
          style={styles.actionButton}
          accessibilityLabel={STRINGS.errorBoundary.recoverAction}
        />

        <Text style={styles.supportText}>
          {STRINGS.errorBoundary.contactSupport}
        </Text>
      </View>
    );
  }
}

export default ErrorBoundary;
