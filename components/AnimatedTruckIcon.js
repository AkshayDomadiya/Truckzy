import React from "react";
import { MotiView } from "moti";
import TruckIcon from "./TruckIcon";

export default function AnimatedTruckIcon({ delay }) {
  return (
    <MotiView
      from={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "timing",
        duration: 300,
        delay: delay,
      }}
    >
      <TruckIcon />
    </MotiView>
  );
}
