import { useEffect, useState } from "react";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useScreenSize from "../../hooks/screen-size";
import hapticImpact from "../../utils/haptic-impact";
import STARTUP_ANIMATION_CONFIGS from "../../constants/startup-animation-configs";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";

const isMobile = Platform.OS === "ios" || Platform.OS === "android";

const COLOR_TRANSITION_DURATION = 1500;
const WRITE_MOBILE_SPEED = 5;
const DELETE_MOBILE_SPEED = 1;
const WRITE_DESKTOP_SPEED = 100;
const DELETE_DESKTOP_SPEED = 25;

const LoginAnimatedTopSheet = (): JSX.Element => {
  const [colorIndex, setColorIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [animationState, setAnimationState] = useState("writing");
  const { isLarge, isXLarge, isBiggerThanLarge } = useScreenSize();

  const textColorAnim = useSharedValue(STARTUP_ANIMATION_CONFIGS[0].text);
  const backgroundColorAnim = useSharedValue(
    STARTUP_ANIMATION_CONFIGS[0].background,
  );

  useEffect(() => {
    if (animationState === "writing") {
      if (displayedPhrase.length === 0) {
        hapticImpact("Light");
      }
      if (
        displayedPhrase.length <
        STARTUP_ANIMATION_CONFIGS[colorIndex].phrase.length
      ) {
        setTimeout(
          () => {
            hapticImpact("Light");
            setDisplayedPhrase(
              STARTUP_ANIMATION_CONFIGS[colorIndex].phrase.slice(
                0,
                displayedPhrase.length + 1,
              ),
            );
          },
          isMobile ? WRITE_MOBILE_SPEED : WRITE_DESKTOP_SPEED,
        );
      } else {
        // wait 2 seconds before deleting the phrase
        setTimeout(() => {
          setAnimationState("deleting");
        }, 2000);
      }
    }
  }, [displayedPhrase, animationState]);

  // Useffect that starts deleting the phrase on a typing animation usign the speed defined in DELETE_MOBILE_SPEED
  useEffect(() => {
    if (animationState === "deleting") {
      if (displayedPhrase.length > 0) {
        hapticImpact("Light");
        setTimeout(
          () => {
            setDisplayedPhrase(
              STARTUP_ANIMATION_CONFIGS[colorIndex].phrase.slice(
                0,
                displayedPhrase.length - 1,
              ),
            );
          },
          isMobile ? DELETE_MOBILE_SPEED : DELETE_DESKTOP_SPEED,
        );
      } else {
        setColorIndex((colorIndex + 1) % STARTUP_ANIMATION_CONFIGS.length);
        setAnimationState("writing");
      }
    }
  }, [displayedPhrase, animationState]);

  // Animations
  useEffect(() => {
    // Animar el color de fondo
    backgroundColorAnim.value = withTiming(
      STARTUP_ANIMATION_CONFIGS[colorIndex].background,
      {
        duration: COLOR_TRANSITION_DURATION,
        easing: Easing.inOut(Easing.ease),
      },
    );

    // Animar el color del texto
    textColorAnim.value = withTiming(
      STARTUP_ANIMATION_CONFIGS[colorIndex].text,
      {
        duration: COLOR_TRANSITION_DURATION,
        easing: Easing.inOut(Easing.ease),
      },
    );
  }, [colorIndex]);

  return (
    <Animated.View
      style={[
        styles.topView,
        {
          backgroundColor: backgroundColorAnim.value,
          flex: 7,
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.topViewText,
          {
            color: textColorAnim.value,
            fontSize: isBiggerThanLarge ? 50 : 30,
          },
        ]}
      >
        {displayedPhrase}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 30,
  },
  topViewText: {
    fontWeight: "bold",
  },
  bottomView: {
    width: "100%",
    height: "100%",
  },
  bottomSheet: {
    height: "100%",
    width: "100%",
    paddingTop: 25,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export default LoginAnimatedTopSheet;
