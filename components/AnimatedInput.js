import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";

export default function AnimatedInput({ label, ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <MotiView
        animate={{
          borderColor: focused ? "#1e90ff" : "#e5e7eb",
          shadowOpacity: focused ? 0.15 : 0,
        }}
        transition={{ type: "timing", duration: 200 }}
        style={[styles.inputWrapper, { borderColor: focused ? "#1e90ff" : "#e5e7eb", shadowOpacity: focused ? 0.15 : 0 }]}
      >
        <TextInput
          style={styles.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    color: '#495057',
    fontWeight: '500',
    fontSize: 15,
  },
  inputWrapper: {
    borderWidth: 2,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    paddingHorizontal: 0,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#22223b',
  },
}); 