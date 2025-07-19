import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import BottomSheet from "../components/BottomSheet";
import TruckIcon from "../components/TruckIcon";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { MotiView } from "moti";
import AnimatedTruckIcon from "../components/AnimatedTruckIcon";

const dummyTrucks = [
  { id: 1, lat: 37.78825, lng: -122.4324 },
  { id: 2, lat: 37.78925, lng: -122.4314 },
  { id: 3, lat: 37.78725, lng: -122.4334 },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [sheetVisible, setSheetVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isLarge = width > 400;
  const fabRight = isLarge ? 32 : 16;
  const fabBottom = isLarge ? 128 : 96;
  const sheetPadding = isLarge ? 24 : 12;

  return (
    <View style={styles.screen}>
      <AppHeader title="Truckzy" />
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {dummyTrucks.map((truck, index) => (
            <Marker
              key={truck.id}
              coordinate={{ latitude: truck.lat, longitude: truck.lng }}
            >
              <AnimatedTruckIcon delay={index * 100} />
            </Marker>
          ))}
        </MapView>
        {loading && (
          <View style={styles.loadingOverlay}>
            <LottieView
              source={require("../assets/animations/loading.json")}
              autoPlay
              loop
              style={{ width: 100, height: 100 }}
            />
          </View>
        )}
        <TouchableOpacity
          style={[styles.fab, { right: fabRight, bottom: fabBottom }]}
          onPress={() => navigation.navigate("BookingFlow")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
        <BottomSheet visible={sheetVisible}>
          <Text style={styles.sheetTitle}>Nearby Trucks</Text>
          {dummyTrucks.map(truck => (
            <View key={truck.id} style={styles.truckRow}>
              <TruckIcon />
              <Text style={styles.truckText}>Truck #{truck.id} • 0.{truck.id} km away</Text>
            </View>
          ))}
          <AppButton
            title="Book a Truck"
            onPress={() => navigation.navigate("BookingFlow")}
            style={{ marginTop: 16 }}
          />
        </BottomSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholderText: {
    fontSize: 18,
    color: '#94a3b8',
    marginTop: 16,
    fontWeight: '500',
  },
  mapPlaceholderSubtext: {
    fontSize: 15,
    color: '#cbd5e1',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#1e90ff',
    borderRadius: 32,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#22223b',
  },
  truckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  truckText: {
    marginLeft: 12,
    color: '#495057',
    fontSize: 16,
  },
}); 