import React, { useState } from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';
import { useDebounce } from '../useDebounce';

const TestComponent: React.FC = () => {
  const [val, setVal] = useState('initial');
  const debounced = useDebounce(val, 300);

  return (
    <TouchableOpacity onPress={() => setVal('updated')}>
      <Text testID="debounced-text">{debounced}</Text>
    </TouchableOpacity>
  );
};

describe('useDebounce Hook Unit Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render initial value and update only after debounce timeout', () => {
    let testRenderer: renderer.ReactTestRenderer | undefined;

    act(() => {
      testRenderer = renderer.create(<TestComponent />);
    });

    const root = testRenderer?.root;
    const textNode = root?.findByProps({ testID: 'debounced-text' });
    expect(textNode?.props.children).toBe('initial');

    // Trigger state change
    const button = root?.findByType(TouchableOpacity);
    act(() => {
      button?.props.onPress();
    });

    // Before timer: should still be 'initial'
    expect(textNode?.props.children).toBe('initial');

    // Fast-forward 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // After timer: should update to 'updated'
    expect(textNode?.props.children).toBe('updated');
  });
});
