import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { MotiView } from "moti";

const { height } = Dimensions.get("window");

export default function BottomSheet({ visible, children }) {
  return (
    <MotiView
      from={{ translateY: height }}
      animate={{ translateY: visible ? 0 : height }}
      transition={{ type: "timing", duration: 400 }}
      style={styles.sheet}
    >
      {children}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
    padding: 24,
    minHeight: 200,
  },
}); 