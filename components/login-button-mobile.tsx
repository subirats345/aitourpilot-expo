/**
 * Login button component.
 * @param title - The title of the button.
 * @param onPress - The function that gets executed when the button is pressed.
 * @param type - The type of button (Dark, Light, Outlined).
 * @returns A login button component.
 */

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ComponentProps } from "react";

export default function LoginButtonMobile({
  title,
  icon,
  onPress,
  type = "Dark", // Default button type
  width = "100%",
}: LoginButtonMobileProps) {
  // Assign styles based on button type
  const buttonStyles = [styles.button, styles[type], { width: width }];
  const textStyles = [styles.buttonText, styles[`${type}Text`]];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {icon && (
          <AntDesign
            name={icon}
            size={24}
            color={type === "Dark" ? "#eeedf2" : "#313133"}
          />
        )}
        <Text style={textStyles}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Base styles for the component
const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  // Specific styles for each button type
  Dark: {
    backgroundColor: "#1c1b20",
  },
  DarkText: {
    color: "#eeedf2",
  },
  Light: {
    backgroundColor: "#c6c6d3",
  },
  LightText: {
    color: "#313133",
  },
  Outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#a8a2a8",
  },
  OutlinedText: {
    color: "#313035",
  },
});
