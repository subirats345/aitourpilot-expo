/**
 * Execute haptic feedback on iOS and Android devices.
 * @param style the style of the haptic feedback.
 * @returns a promise that resolves when the haptic feedback is done.
 */

import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

export default async function hapticImpact(
  style: "Heavy" | "Medium" | "Light",
) {
  if (Platform.OS === "web") {
    return;
  }

  let vibrationEffect;

  switch (style) {
    case "Heavy":
      vibrationEffect = Haptics.ImpactFeedbackStyle.Heavy;
      break;
    case "Medium":
      vibrationEffect = Haptics.ImpactFeedbackStyle.Medium;
      break;
    case "Light":
      vibrationEffect = Haptics.ImpactFeedbackStyle.Light;
      break;
    default:
      vibrationEffect = Haptics.ImpactFeedbackStyle.Light;
      break;
  }

  await Haptics.impactAsync(vibrationEffect);
}
