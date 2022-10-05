/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import {useRNTesterTheme} from '../../components/RNTesterTheme';
import {useRNTesterTabVisibilityToggleContext} from '../../components/RNTesterTabVisibility';

const React = require('react');
const ReactNative = require('react-native');
const {Platform, View, StyleSheet, TouchableOpacity, TVFocusGuideView} =
  ReactNative;

const {useRef, useState, useEffect} = React;

const RNText = ReactNative.Text;

exports.framework = 'React';
exports.title = 'TVFocus no focusable element';
exports.description = 'Focus no focusable element';
exports.displayName = 'TVFocusNoFocusableElement';
exports.examples = [
  {
    title: 'No Focusable element',
    render(): React.Node {
      return <TVFocusNoFocusableElement />;
    },
  },
];

const Text = ({style, children}) => {
  const theme = useRNTesterTheme();
  return (
    <RNText style={[styles.text, {color: theme.LabelColor}, style]}>
      {children}
    </RNText>
  );
};

const TVFocusNoFocusableElement = () => {
  const [testCounter, setTestCounter] = useState(0);
  const focusCount = useRef(0);
  const setTabVisibility = useRNTesterTabVisibilityToggleContext();
  const focusDestination1 = useRef();
  const focusDestination2 = useRef();

  useEffect(() => {
    const i = setInterval(() => {
      focusCount.current = focusCount.current + 1;
      setTestCounter(focusCount.current);
      setTabVisibility(focusCount.current % 10 < 5);
    }, 10000);
    return () => clearInterval(i);
  }, []);

  if (!Platform.isTV) {
    return (
      <View>
        <Text>This example is intended to be run on TV.</Text>
      </View>
    );
  }

  let testCounter2 = testCounter % 2;
  let testCounter3 = testCounter % 3;
  return (
    <>
      <View>
        <Text>
          Count: {testCounter} {testCounter2}
        </Text>
        {testCounter3 === 0 ? (
          <TVFocusGuideView
            destinations={[
              focusDestination1.current,
              focusDestination2.current,
            ]}>
            <Text>focus guide</Text>
            <TouchableOpacity ref={focusDestination2} accessible={false}><Text>Focus dest 2</Text></TouchableOpacity>
            <TouchableOpacity ref={focusDestination1}><Text>Focus dest 1</Text></TouchableOpacity>
          </TVFocusGuideView>
        ) : undefined}
        {testCounter2 === 0 ? (
          <TouchableOpacity ref={focusDestination1}><Text>Focus dest 1</Text></TouchableOpacity>
        ) : undefined}

      </View>
    </>
  );
};

const scale = Platform.OS === 'ios' ? 1.0 : 0.5;

const styles = StyleSheet.create({
  outOfScreenTop: {
    position: 'absolute',
    top: -150,
    height: 50,
  },
  outOfScreenBottom: {
    position: 'absolute',
    bottom: -50,
    height: 50,
  },
  outOfScreenRight: {
    position: 'absolute',
    top: 10,
    left: 2500,
  },
  outOfScreenLeft: {
    position: 'absolute',
    top: 10,
    left: -1000,
  },
  barelyVisibleRight: {
    position: 'absolute',
    top: 10,
    right: -100,
    width: 101,
  },
  barelyVisibleLeft: {
    position: 'absolute',
    top: 10,
    left: -100,
    width: 101,
  },
  barelyVisibleTop: {
    position: 'absolute',
    top: -100,
    height: 50,
    padding: 0,
  },
  section: {
    flex: 1,
    borderWidth: 1,
    padding: 24 * scale,
  },
  title: {
    fontSize: 32 * scale,
    marginBottom: 24 * scale,
  },
  exampleContainer: {
    flex: 1,
  },
  exampleDescription: {
    fontSize: 20 * scale,
    fontWeight: 'bold',
    marginBottom: 24 * scale,
    opacity: 0.8,
  },
  exampleContent: {
    flexDirection: 'row',
  },
  exampleFocusGuide: {
    backgroundColor: 'cyan',
    flexDirection: 'row',
  },
  exampleButton: {
    marginVertical: 10 * scale,
    minWidth: 100 * scale,
    height: 60 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18 * scale,
  },
});
