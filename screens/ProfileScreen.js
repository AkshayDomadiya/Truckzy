import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import AppHeader from "../components/AppHeader";
import AppCard from "../components/AppCard";
import AppButton from "../components/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const dummyBookings = [
  { id: "1", date: "2024-06-01", from: "MG Road", to: "Indiranagar", fare: "₹499" },
  { id: "2", date: "2024-05-28", from: "Koramangala", to: "Whitefield", fare: "₹799" },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isLarge = width > 400;
  const paddingH = isLarge ? 32 : 16;
  const avatarSize = isLarge ? 96 : 72;

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#1e90ff", "#38b2ac"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradientBg}
      />
      <View style={[styles.container]}> 
        {/* User Card */}
        <View style={[styles.userCardWrap, { marginTop: avatarSize + (isLarge ? 40 : 28) }]}>
          <View style={[styles.avatarWrap, { top: -avatarSize / 2, left: '50%', marginLeft: -avatarSize / 2 }]}> 
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={[
                styles.avatar,
                { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }
              ]}
            />
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="create-outline" size={20} color="#1e90ff" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, { fontSize: isLarge ? 22 : 17 }]} >John Doe</Text>
          <Text style={[styles.phone, { fontSize: isLarge ? 15 : 13 }]}>+91 98765 43210</Text>
        </View>
        {/* Bookings Section */}
        <Text style={[styles.sectionTitle, { marginLeft: paddingH, fontSize: isLarge ? 18 : 15 }]}>Past Bookings</Text>
        <FlatList
          data={dummyBookings}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: paddingH, paddingBottom: isLarge ? 16 : 8 }}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              <View style={styles.bookingRow}>
                <Ionicons name="calendar-outline" size={isLarge ? 20 : 16} color="#38b2ac" />
                <Text style={[styles.bookingDate, { fontSize: isLarge ? 15 : 12 }]}>{item.date}</Text>
                <View style={{ flex: 1 }} />
                <Ionicons name="chevron-forward" size={18} color="#adb5bd" />
              </View>
              <Text style={[styles.bookingRoute, { fontSize: isLarge ? 16 : 13 }]}>
                {item.from} → {item.to}
              </Text>
              <Text style={[styles.bookingFare, { fontSize: isLarge ? 16 : 13 }]}>{item.fare}</Text>
            </View>
          )}
        />
        <View style={[styles.logoutWrap, { paddingHorizontal: paddingH, marginTop: isLarge ? 24 : 12, marginBottom: isLarge ? 24 : 12 }]}> 
          <AppButton title="Logout" onPress={() => navigation.replace("Login")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    zIndex: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  userCardWrap: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 22,
    marginHorizontal: 24,
    marginTop: 0,
    marginBottom: 24,
    paddingTop: 48,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
    position: 'relative',
  },
  avatarWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: -8,
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#1e90ff',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    color: '#22223b',
    marginTop: 12,
  },
  phone: {
    color: '#6c757d',
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#22223b',
    marginBottom: 8,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bookingDate: {
    marginLeft: 8,
    color: '#495057',
  },
  bookingRoute: {
    color: '#22223b',
    fontWeight: '600',
    marginBottom: 2,
  },
  bookingFare: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  logoutWrap: {
  },
}); 