import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";

export default function AppButton({ title, onPress, style }) {
  return (
    <MotiView
      from={{ scale: 1 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "timing", duration: 150 }}
    >
      <Pressable
        onPress={onPress}
        style={[styles.buttonContainer, style]}
      >
        <LinearGradient
          colors={["#1e90ff", "#38b2ac"]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 999,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
}); 