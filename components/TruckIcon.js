import React from "react";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";

export default function TruckIcon(props) {
  return (
    <MotiView
      from={{ scale: 0.8, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "timing", duration: 500 }}
      style={{ marginRight: 2 }}
    >
      {/* Use a valid Ionicons name, e.g., "bus-outline" for a modern look */}
      <Ionicons name="bus-outline" size={36} color="#1e90ff" {...props} />
    </MotiView>
  );
} 