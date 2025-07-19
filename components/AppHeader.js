import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppHeader({ title, leftIcon, onLeftPress }) {
  return (
    <View style={styles.headerContainer}>
      {leftIcon && (
        <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
          <Ionicons
            name={leftIcon}
            size={28}
            color="#1e90ff"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
    marginBottom: 18, // Add margin below header for all screens
    marginTop: 25,
  },
  iconButton: {
    marginRight: 8,
    padding: 4,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22223b',
  },
}); 