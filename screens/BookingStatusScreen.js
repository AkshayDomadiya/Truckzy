import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Image, TouchableOpacity } from "react-native";
import AppHeader from "../components/AppHeader";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const statuses = [
  { label: "Searching Driver", icon: "search-outline" },
  { label: "Driver Found", icon: "person-outline" },
  { label: "Driver Enroute", icon: "car-outline" },
  { label: "Arrived", icon: "flag-outline" },
];

const driver = {
  name: "Amit Kumar",
  phone: "+91 98765 43210",
  avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  truck: "Tata Ace Mini",
  truckNo: "KA 05 AB 1234",
  rating: 4.8,
};

export default function BookingStatusScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const { width } = useWindowDimensions();
  const isLarge = width > 400;
  const paddingH = isLarge ? 32 : 16;

  useEffect(() => {
    if (step < statuses.length - 1) {
      const timer = setTimeout(() => setStep(step + 1), 1800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === statuses.length - 1) {
      const timer = setTimeout(() => navigation.navigate("MainTabs", { screen: "Bookings" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Progress bar width
  const progress = ((step + 1) / statuses.length) * 100;

  return (
    <View style={styles.screen}>
      <AppHeader title="Booking Status" />
      <View style={[styles.content, { paddingHorizontal: paddingH }]}> 
        {/* Animated Progress Bar */}
        <View style={styles.progressBarWrap}>
          <View style={styles.progressBarBg}>
            <MotiView
              animate={{ width: `${progress}%` }}
              transition={{ type: "timing", duration: 600 }}
              style={styles.progressBarFill}
            />
          </View>
          <Text style={styles.progressText}>{statuses[step].label}</Text>
        </View>

        {/* W-shaped Stepper */}
        <View style={styles.wStepperWrap}>
          {/* Top row: steps 0, 2 */}
          <View style={styles.wStepperRowTop}>
            {/* Step 0 (left) */}
            <View style={styles.wStepItem}>
              <MotiView
                animate={{
                  backgroundColor: step > 0 ? '#38b2ac' : step === 0 ? '#fff' : '#f1f5f9',
                  borderColor: step === 0 ? '#1e90ff' : step > 0 ? '#38b2ac' : '#cbd5e1',
                  shadowOpacity: step === 0 ? 0.18 : 0,
                }}
                transition={{ type: 'timing', duration: 400 }}
                style={styles.wStepCircle}
              >
                {step > 0 ? (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                ) : (
                  <Ionicons name={statuses[0].icon} size={20} color={step === 0 ? '#1e90ff' : '#adb5bd'} />
                )}
              </MotiView>
              <Text style={[styles.wStepLabel, step === 0 && styles.wStepLabelActive]}>{statuses[0].label}</Text>
            </View>
            {/* Spacer for W shape */}
            <View style={{ flex: 1 }} />
            {/* Step 2 (right) */}
            <View style={styles.wStepItem}>
              <MotiView
                animate={{
                  backgroundColor: step > 2 ? '#38b2ac' : step === 2 ? '#fff' : '#f1f5f9',
                  borderColor: step === 2 ? '#1e90ff' : step > 2 ? '#38b2ac' : '#cbd5e1',
                  shadowOpacity: step === 2 ? 0.18 : 0,
                }}
                transition={{ type: 'timing', duration: 400 }}
                style={styles.wStepCircle}
              >
                {step > 2 ? (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                ) : (
                  <Ionicons name={statuses[2].icon} size={20} color={step === 2 ? '#1e90ff' : '#adb5bd'} />
                )}
              </MotiView>
              <Text style={[styles.wStepLabel, step === 2 && styles.wStepLabelActive]}>{statuses[2].label}</Text>
            </View>
          </View>
          {/* Connecting lines for W */}
          <View style={styles.wLinesRow}>
            <View style={styles.wLineLeft} />
            <View style={{ flex: 1 }} />
            <View style={styles.wLineRight} />
          </View>
          {/* Bottom row: steps 1, 3 */}
          <View style={styles.wStepperRowBottom}>
            {/* Step 1 (left below center) */}
            <View style={styles.wStepItemBottom}>
              <MotiView
                animate={{
                  backgroundColor: step > 1 ? '#38b2ac' : step === 1 ? '#fff' : '#f1f5f9',
                  borderColor: step === 1 ? '#1e90ff' : step > 1 ? '#38b2ac' : '#cbd5e1',
                  shadowOpacity: step === 1 ? 0.18 : 0,
                }}
                transition={{ type: 'timing', duration: 400 }}
                style={styles.wStepCircle}
              >
                {step > 1 ? (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                ) : (
                  <Ionicons name={statuses[1].icon} size={20} color={step === 1 ? '#1e90ff' : '#adb5bd'} />
                )}
              </MotiView>
              <Text style={[styles.wStepLabel, step === 1 && styles.wStepLabelActive]}>{statuses[1].label}</Text>
            </View>
            {/* Spacer for W shape */}
            <View style={{ flex: 1 }} />
            {/* Step 3 (right below center) */}
            <View style={styles.wStepItemBottom}>
              <MotiView
                animate={{
                  backgroundColor: step > 3 ? '#38b2ac' : step === 3 ? '#fff' : '#f1f5f9',
                  borderColor: step === 3 ? '#1e90ff' : step > 3 ? '#38b2ac' : '#cbd5e1',
                  shadowOpacity: step === 3 ? 0.18 : 0,
                }}
                transition={{ type: 'timing', duration: 400 }}
                style={styles.wStepCircle}
              >
                {step > 3 ? (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                ) : (
                  <Ionicons name={statuses[3].icon} size={20} color={step === 3 ? '#1e90ff' : '#adb5bd'} />
                )}
              </MotiView>
              <Text style={[styles.wStepLabel, step === 3 && styles.wStepLabelActive]}>{statuses[3].label}</Text>
            </View>
          </View>
        </View>

        {/* Driver & Truck Info (show after driver found) */}
        {step > 0 && (
          <View style={styles.driverCard}>
            <View style={styles.driverRow}>
              <Image source={{ uri: driver.avatar }} style={styles.driverAvatar} />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.driverName}>{driver.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Text style={styles.driverRating}>{driver.rating}</Text>
                </View>
                <Text style={styles.driverPhone}>{driver.phone}</Text>
              </View>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="call" size={22} color="#38b2ac" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="chatbubble-ellipses-outline" size={22} color="#1e90ff" />
              </TouchableOpacity>
            </View>
            <View style={styles.truckRow}>
              <Ionicons name="cube-outline" size={20} color="#1e90ff" />
              <Text style={styles.truckText}>{driver.truck} • {driver.truckNo}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  progressBarWrap: {
    marginBottom: 24,
    alignItems: 'center',
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
  },
  progressText: {
    color: '#1e90ff',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 2,
  },
  statusStepsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  statusStep: {
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    marginBottom: 4,
  },
  statusText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  statusTextActive: {
    color: '#1e90ff',
  },
  statusTextInactive: {
    color: '#cbd5e1',
  },
  driverCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 8,
    marginBottom: 16,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  driverAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#38b2ac',
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#22223b',
  },
  driverRating: {
    marginLeft: 4,
    color: '#fbbf24',
    fontWeight: '600',
    fontSize: 15,
  },
  driverPhone: {
    color: '#6c757d',
    fontSize: 14,
    marginTop: 2,
  },
  iconBtn: {
    marginLeft: 10,
    backgroundColor: '#e0f2fe',
    borderRadius: 18,
    padding: 8,
  },
  truckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  truckText: {
    marginLeft: 8,
    color: '#495057',
    fontSize: 15,
    fontWeight: '500',
  },
  zStepperWrap: {
    marginBottom: 28,
    marginTop: 8,
    alignItems: 'center',
  },
  zStepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  zStepItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 60,
    zIndex: 2,
  },
  zStepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0,
    elevation: 2,
  },
  zStepLabel: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 2,
    textAlign: 'center',
    maxWidth: 70,
  },
  zStepLabelActive: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  zStepLine: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#e9ecef',
    marginHorizontal: 2,
    marginBottom: 18,
    flex: 1,
    minWidth: 18,
    maxWidth: 32,
  },
  zStepDiagonal: {
    width: 32,
    height: 18,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#e9ecef',
    position: 'relative',
    left: -16,
    top: -8,
    borderBottomLeftRadius: 8,
  },
  zStepDiagonalReverse: {
    width: 32,
    height: 18,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: '#e9ecef',
    position: 'relative',
    right: -16,
    top: 8,
    borderTopRightRadius: 8,
  },
  wStepperWrap: {
    marginBottom: 28,
    marginTop: 8,
    alignItems: 'center',
    width: '100%',
  },
  wStepperRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 0,
    paddingHorizontal: 24,
  },
  wStepperRowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -8,
    paddingHorizontal: 64,
  },
  wStepItem: {
    alignItems: 'center',
    minWidth: 60,
    zIndex: 2,
  },
  wStepItemBottom: {
    alignItems: 'center',
    minWidth: 60,
    zIndex: 2,
  },
  wStepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0,
    elevation: 2,
  },
  wStepLabel: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 2,
    textAlign: 'center',
    maxWidth: 70,
  },
  wStepLabelActive: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  wLinesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 18,
    marginTop: -8,
    marginBottom: -8,
    paddingHorizontal: 24,
  },
  wLineLeft: {
    width: 60,
    height: 18,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#e9ecef',
    borderBottomLeftRadius: 8,
  },
  wLineRight: {
    width: 60,
    height: 18,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#e9ecef',
    borderBottomRightRadius: 8,
  },
}); 