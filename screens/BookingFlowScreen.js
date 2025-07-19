import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import AnimatedInput from "../components/AnimatedInput";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const steps = [
  { key: "pickup", label: "Pickup Location", icon: "location-outline" },
  { key: "drop", label: "Drop Location", icon: "flag-outline" },
  { key: "type", label: "Truck Type", icon: "car-outline" },
  { key: "fare", label: "Fare Estimate", icon: "cash-outline" },
  { key: "confirm", label: "Confirm", icon: "checkmark-done-outline" },
];

export default function BookingFlowScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [truckType, setTruckType] = useState("");
  const fare = "₹ 499";
  const { width } = useWindowDimensions();
  const isLarge = width > 400;
  const paddingH = isLarge ? 32 : 16;

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else navigation.navigate("MainTabs", { screen: "Bookings" });
  };

  // Step indicator progress
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <View style={styles.screen}>
      <AppHeader title="Book a Truck" leftIcon="arrow-back" onLeftPress={() => navigation.goBack()} />
      <View style={[styles.content, { paddingHorizontal: paddingH }]}> 
        {/* Z-shaped Stepper */}
        {width > 500 ? (
          // 3-row Z stepper for large screens
          <View style={styles.zStepperWrap}>
            {/* Top row: steps 0, 1 */}
            <View style={styles.zStepperRow}>
              {steps.slice(0, 2).map((s, i) => {
                const idx = i;
                const isActive = idx === step;
                const isCompleted = idx < step;
                return (
                  <React.Fragment key={s.key}>
                    <View style={styles.zStepItem}>
                      <MotiView
                        animate={{
                          backgroundColor: isCompleted ? '#38b2ac' : isActive ? '#fff' : '#f1f5f9',
                          borderColor: isActive ? '#1e90ff' : isCompleted ? '#38b2ac' : '#cbd5e1',
                          shadowOpacity: isActive ? 0.18 : 0,
                        }}
                        transition={{ type: 'timing', duration: 400 }}
                        style={styles.zStepCircle}
                      >
                        {isCompleted ? (
                          <Ionicons name="checkmark" size={20} color="#fff" />
                        ) : (
                          <Text style={[styles.zStepNumber, isActive && { color: '#1e90ff', fontWeight: 'bold' }]}>{idx + 1}</Text>
                        )}
                      </MotiView>
                      <Text style={[styles.zStepLabel, isActive && styles.zStepLabelActive]}>{s.label}</Text>
                    </View>
                    {/* Diagonal line to middle step */}
                    {i === 1 && (
                      <View style={styles.zStepDiagonal} />
                    )}
                  </React.Fragment>
                );
              })}
            </View>
            {/* Middle row: step 2 */}
            <View style={[styles.zStepperRow, { justifyContent: 'center' }]}> 
              <View style={styles.zStepItem}>
                <MotiView
                  animate={{
                    backgroundColor: step > 2 ? '#38b2ac' : step === 2 ? '#fff' : '#f1f5f9',
                    borderColor: step === 2 ? '#1e90ff' : step > 2 ? '#38b2ac' : '#cbd5e1',
                    shadowOpacity: step === 2 ? 0.18 : 0,
                  }}
                  transition={{ type: 'timing', duration: 400 }}
                  style={styles.zStepCircle}
                >
                  {step > 2 ? (
                    <Ionicons name="checkmark" size={20} color="#fff" />
                  ) : (
                    <Text style={[styles.zStepNumber, step === 2 && { color: '#1e90ff', fontWeight: 'bold' }]}>3</Text>
                  )}
                </MotiView>
                <Text style={[styles.zStepLabel, step === 2 && styles.zStepLabelActive]}>{steps[2].label}</Text>
              </View>
            </View>
            {/* Bottom row: steps 3, 4 */}
            <View style={styles.zStepperRow}>
              {steps.slice(3, 5).map((s, i) => {
                const idx = i + 3;
                const isActive = idx === step;
                const isCompleted = idx < step;
                return (
                  <React.Fragment key={s.key}>
                    {/* Diagonal line from middle to this step */}
                    {i === 0 && <View style={styles.zStepDiagonalReverse} />}
                    <View style={styles.zStepItem}>
                      <MotiView
                        animate={{
                          backgroundColor: isCompleted ? '#38b2ac' : isActive ? '#fff' : '#f1f5f9',
                          borderColor: isActive ? '#1e90ff' : isCompleted ? '#38b2ac' : '#cbd5e1',
                          shadowOpacity: isActive ? 0.18 : 0,
                        }}
                        transition={{ type: 'timing', duration: 400 }}
                        style={styles.zStepCircle}
                      >
                        {isCompleted ? (
                          <Ionicons name="checkmark" size={20} color="#fff" />
                        ) : (
                          <Text style={[styles.zStepNumber, isActive && { color: '#1e90ff', fontWeight: 'bold' }]}>{idx + 1}</Text>
                        )}
                      </MotiView>
                      <Text style={[styles.zStepLabel, isActive && styles.zStepLabelActive]}>{s.label}</Text>
                    </View>
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        ) : (
          // 2-row Z stepper for small screens
          <View style={styles.zStepperWrap}>
            {/* Top row: steps 0, 1, 2 */}
            <View style={styles.zStepperRow}>
              {steps.slice(0, 3).map((s, i) => {
                const isActive = i === step;
                const isCompleted = i < step;
                return (
                  <React.Fragment key={s.key}>
                    <View style={styles.zStepItem}>
                      <MotiView
                        animate={{
                          backgroundColor: isCompleted ? '#38b2ac' : isActive ? '#fff' : '#f1f5f9',
                          borderColor: isActive ? '#1e90ff' : isCompleted ? '#38b2ac' : '#cbd5e1',
                          shadowOpacity: isActive ? 0.18 : 0,
                        }}
                        transition={{ type: 'timing', duration: 400 }}
                        style={styles.zStepCircle}
                      >
                        {isCompleted ? (
                          <Ionicons name="checkmark" size={20} color="#fff" />
                        ) : (
                          <Text style={[styles.zStepNumber, isActive && { color: '#1e90ff', fontWeight: 'bold' }]}>{i + 1}</Text>
                        )}
                      </MotiView>
                      <Text style={[styles.zStepLabel, isActive && styles.zStepLabelActive]}>{s.label}</Text>
                    </View>
                    {/* Connecting line except after last step */}
                    {i < 2 && <View style={styles.zStepLine} />}
                  </React.Fragment>
                );
              })}
            </View>
            {/* Bottom row: steps 3, 4 */}
            <View style={styles.zStepperRow}>
              {steps.slice(3, 5).map((s, i) => {
                const idx = i + 3;
                const isActive = idx === step;
                const isCompleted = idx < step;
                return (
                  <React.Fragment key={s.key}>
                    {/* Diagonal line from top to this step */}
                    {i === 0 && <View style={styles.zStepDiagonal} />}
                    <View style={styles.zStepItem}>
                      <MotiView
                        animate={{
                          backgroundColor: isCompleted ? '#38b2ac' : isActive ? '#fff' : '#f1f5f9',
                          borderColor: isActive ? '#1e90ff' : isCompleted ? '#38b2ac' : '#cbd5e1',
                          shadowOpacity: isActive ? 0.18 : 0,
                        }}
                        transition={{ type: 'timing', duration: 400 }}
                        style={styles.zStepCircle}
                      >
                        {isCompleted ? (
                          <Ionicons name="checkmark" size={20} color="#fff" />
                        ) : (
                          <Text style={[styles.zStepNumber, isActive && { color: '#1e90ff', fontWeight: 'bold' }]}>{idx + 1}</Text>
                        )}
                      </MotiView>
                      <Text style={[styles.zStepLabel, isActive && styles.zStepLabelActive]}>{s.label}</Text>
                    </View>
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        )}

        {/* Step Card */}
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
          style={styles.stepCard}
        >
          {step === 0 && (
            <>
              <Ionicons name="location-outline" size={isLarge ? 44 : 32} color="#1e90ff" style={styles.stepCardIcon} />
              <Text style={styles.stepCardTitle}>Pickup Location</Text>
              <AnimatedInput label="Enter Pickup Location" value={pickup} onChangeText={setPickup} />
            </>
          )}
          {step === 1 && (
            <>
              <Ionicons name="flag-outline" size={isLarge ? 44 : 32} color="#38b2ac" style={styles.stepCardIcon} />
              <Text style={styles.stepCardTitle}>Drop Location</Text>
              <AnimatedInput label="Enter Drop Location" value={drop} onChangeText={setDrop} />
            </>
          )}
          {step === 2 && (
            <>
              <Ionicons name="car-outline" size={isLarge ? 44 : 32} color="#1e90ff" style={styles.stepCardIcon} />
              <Text style={styles.stepCardTitle}>Truck Type</Text>
              <AnimatedInput label="Truck Type (Mini, Pickup, Lorry...)" value={truckType} onChangeText={setTruckType} />
              <View style={styles.truckTypeRow}>
                <TouchableOpacity style={styles.truckTypeBtn} onPress={() => setTruckType('Mini')}>
                  <Ionicons name="cube-outline" size={20} color="#1e90ff" />
                  <Text style={styles.truckTypeBtnText}>Mini</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.truckTypeBtn} onPress={() => setTruckType('Pickup')}>
                  <Ionicons name="car-outline" size={20} color="#38b2ac" />
                  <Text style={styles.truckTypeBtnText}>Pickup</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.truckTypeBtn} onPress={() => setTruckType('Lorry')}>
                  <Ionicons name="bus-outline" size={20} color="#1e90ff" />
                  <Text style={styles.truckTypeBtnText}>Lorry</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {step === 3 && (
            <View style={styles.fareWrap}>
              <Ionicons name="cash-outline" size={isLarge ? 44 : 32} color="#1e90ff" style={styles.stepCardIcon} />
              <Text style={styles.stepCardTitle}>Fare Estimate</Text>
              <Text style={[styles.fare, { fontSize: isLarge ? 32 : 22 }]}>{fare}</Text>
              <Text style={[styles.fareLabel, { fontSize: isLarge ? 16 : 13 }]}>Estimated Fare</Text>
            </View>
          )}
          {step === 4 && (
            <View style={styles.confirmWrap}>
              <Ionicons name="checkmark-circle" size={isLarge ? 64 : 44} color="#38b2ac" />
              <Text style={styles.confirmText}>Booking Confirmed!</Text>
              <Text style={styles.confirmSubtext}>Your truck is on the way. Thank you for choosing Truckzy!</Text>
            </View>
          )}
        </MotiView>
        <AppButton
          title={step === steps.length - 1 ? "Confirm Booking" : "Next"}
          onPress={handleNext}
          style={{ marginTop: 32 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  stepperWrap: {
    marginBottom: 28,
    marginTop: 8,
    alignItems: 'center',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 60,
  },
  stepperCircle: {
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
  stepperNumber: {
    color: '#adb5bd',
    fontSize: 16,
    fontWeight: '600',
  },
  stepperLabel: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 2,
    textAlign: 'center',
    maxWidth: 70,
  },
  stepperLabelActive: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  stepperLine: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#e9ecef',
    marginHorizontal: 2,
    marginBottom: 18,
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 12,
  },
  stepCardIcon: {
    marginBottom: 8,
  },
  stepCardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#22223b',
    marginBottom: 12,
  },
  truckTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
  truckTypeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginHorizontal: 4,
  },
  truckTypeBtnText: {
    marginLeft: 6,
    color: '#1e90ff',
    fontWeight: '600',
    fontSize: 15,
  },
  fareWrap: {
    alignItems: 'center',
    marginVertical: 16,
  },
  fare: {
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 4,
  },
  fareLabel: {
    color: '#6c757d',
  },
  confirmWrap: {
    alignItems: 'center',
    marginTop: 12,
  },
  confirmText: {
    fontWeight: '700',
    color: '#38b2ac',
    fontSize: 20,
    marginTop: 12,
  },
  confirmSubtext: {
    color: '#6c757d',
    fontSize: 15,
    marginTop: 6,
    textAlign: 'center',
    maxWidth: 260,
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
  zStepNumber: {
    color: '#adb5bd',
    fontSize: 16,
    fontWeight: '600',
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
}); 