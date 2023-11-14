import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import LoginButtonMobile from "../components/login-button-mobile";
import * as NavigationBar from "expo-navigation-bar";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useScreenSize from "../hooks/screen-size";
import LoginAnimatedTopSheet from "../components/login-animated-top-sheet";

const NAVIGATION_BAR_COLOR = "#e7e1e7";

function LoginButtons({ callback }): JSX.Element {
  const { isLarge, isXLarge, isBiggerThanLarge } = useScreenSize();

  return (
    <>
      <LoginButtonMobile
        title="Continue with Google"
        icon="google"
        type={isBiggerThanLarge ? "Light" : "Dark"}
        onPress={() => callback("Google")}
      />
      <LoginButtonMobile
        title="Continue with Apple"
        icon="apple1"
        type="Light"
        onPress={() => callback("Apple")}
      />
      <LoginButtonMobile
        title="Sign up with email"
        icon="mail"
        type="Light"
        onPress={() => callback("Email")}
      />
      <LoginButtonMobile
        title="Log in"
        type={isBiggerThanLarge ? "Light" : "Outlined"}
        onPress={() => callback("Login")}
      />
    </>
  );
}

function ShortSheetButtons({ callback }): JSX.Element {
  const { isLarge, isXLarge, isBiggerThanLarge } = useScreenSize();

  return (
    <>
      <LoginButtonMobile
        title="Continue with Google"
        icon="google"
        type={isBiggerThanLarge ? "Light" : "Dark"}
        onPress={() => callback("Google")}
      />
    </>
  );
}

export default function LoginScreen() {
  const { isLarge, isXLarge, isBiggerThanLarge } = useScreenSize();

  const [sheetOpen, setSheetOpen] = useState(true);
  const flexValue = useSharedValue(isLarge ? 5 : isXLarge ? 4 : 3);

  useEffect(() => {
    const setNavigationBarColor = async () => {
      await NavigationBar.setBackgroundColorAsync(NAVIGATION_BAR_COLOR);
    };
    setNavigationBarColor();
  }, []);

  const handleBottomSheet = () => {
    console.log("handleBottomSheet");
    setSheetOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log("useEffect", sheetOpen);
    // if (sheetOpen) {
    //   flexValue.value = withTiming(isLarge ? 5 : isXLarge ? 4 : 3, {
    //     duration: 3500,
    //     easing: Easing.inOut(Easing.ease),
    //   });
    // } else {
    //   flexValue.value = withTiming(0.5, {
    //     duration: 3500,
    //     easing: Easing.inOut(Easing.ease),
    //   });
    // }
  }, [sheetOpen]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          flexDirection: isBiggerThanLarge ? "row" : "column",
        },
      ]}
    >
      <LoginAnimatedTopSheet />
      <Animated.View
        style={[
          styles.bottomView,
          {
            backgroundColor: NAVIGATION_BAR_COLOR,
            flex: !sheetOpen ? 0.5 : isLarge ? 5 : isXLarge ? 4 : 3,
          },
        ]}
      >
        <View
          style={[
            styles.bottomSheet,
            {
              borderTopLeftRadius: isBiggerThanLarge ? 0 : 30,
              borderTopRightRadius: isBiggerThanLarge ? 0 : 30,
              justifyContent: isBiggerThanLarge ? "flex-end" : "space-between",
              gap: isBiggerThanLarge ? 16 : 0,
              paddingBottom: isBiggerThanLarge ? 32 : 10,
              backgroundColor: isBiggerThanLarge
                ? "#1c1b20"
                : NAVIGATION_BAR_COLOR,
            },
          ]}
        >
          {sheetOpen === true ? (
            <LoginButtons callback={handleBottomSheet} />
          ) : (
            <ShortSheetButtons callback={handleBottomSheet} />
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    width: "100%",
    height: "100%",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 25,
    height: "100%",
    width: "100%",
    paddingTop: 25,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
