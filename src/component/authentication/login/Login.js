/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';

import Svg, {Image, Circle, ClipPath} from 'react-native-svg';

import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import styles from './styles';
import {useRecoilState, useRecoilValue} from 'recoil';
import * as action from '../../../recoils/authentication/recoil';

import {db} from '../../../environment/config';


const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

// const giftLink = 'https://media2.giphy.com/media/MaaaYoyYTMjuIct0wD/giphy.webp';
const Login = () => {
  const [buttonOpacity] = useState(new Value(1));
  const text = useRecoilValue(action.textState);

  useEffect(() => {
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
      });
  });
  })

  console.log(text, 'meomeo')
  const onStateChange = event([
    {
      nativeEvent: ({state}) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0)),
          ),
        ]),
    },
  ]);

  const onCloseState = event([
    {
      nativeEvent: ({state}) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1)),
          ),
        ]),
    },
  ]);

  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputZindex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{translateY: bgY}],
        }}>
        <Svg height={height + 50} width={width}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require('../../../assets/images/category1.jpg')}
            // href={{uri: giftLink}}
            width={width}
            height={height + 50}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>
      <View style={{height: height / 3, justifyContent: 'center'}}>
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <Animated.View
            style={{
              ...styles.button,
              opacity: buttonOpacity,
              transform: [{translateY: buttonY}],
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
          </Animated.View>
        </TapGestureHandler>
        <Animated.View
          style={{
            ...styles.button,
            backgroundColor: '#2E71DC',
            opacity: buttonOpacity,
            transform: [{translateY: buttonY}],
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            SIGN IN WITH FACEBOOK
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            height: height / 3,
            ...StyleSheet.absoluteFill,
            top: null,
            justifyContent: 'center',
            zIndex: textInputZindex,
            opacity: textInputOpacity,
            transform: [{translateY: textInputY}],
          }}>
          <TapGestureHandler onHandlerStateChange={onCloseState}>
            <Animated.View
              style={{...styles.closeButton, left: width / 2 - 20}}>
              <Animated.Text
                style={{
                  fontSize: 15,
                  transform: [{rotate: concat(rotateCross, 'deg')}],
                }}>
                X
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <Animated.View style={styles.button}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Login;
