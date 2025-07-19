import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Image } from "react-native";
import AppButton from "../components/AppButton";
import AnimatedInput from "../components/AnimatedInput";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { MotiView, MotiImage } from "moti";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { width } = useWindowDimensions();
  const isLarge = width > 400;
  const paddingH = isLarge ? 32 : 16;
  // Responsive illustration size and position
  const illustrationWidth = isLarge ? 220 : width * 0.6;
  const illustrationHeight = isLarge ? 180 : width * 0.45;
  const illustrationRight = isLarge ? -40 : -20;

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#1e90ff", "#38b2ac"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradientBg}
      />
      {/* Animated floating logo/icon */}
      <MotiView
        from={{ scale: 0.7, opacity: 0, translateY: -40 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 8, mass: 1.2, delay: 200 }}
        style={[styles.logoWrap, { top: isLarge ? 60 : 36 }]}
      >
        <View style={styles.logoCircle}>
          <Ionicons name="cube-outline" size={40} color="#fff" />
        </View>
      </MotiView>
      {/* Animated Login Card */}
      <MotiView
        from={{ opacity: 0, translateY: 60, scale: 0.98 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ type: "timing", duration: 700, delay: 350 }}
        style={[styles.card, { marginTop: isLarge ? 120 : 80, paddingHorizontal: paddingH }]}
      >
        <Text style={[styles.title, { fontSize: isLarge ? 32 : 24 }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { fontSize: isLarge ? 16 : 14 }]}>Login to your Truckzy account</Text>
        <AnimatedInput
          label="Email or Phone"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AnimatedInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AppButton title="Login" onPress={() => navigation.replace("MainTabs")} />
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 600 }}
          style={styles.socialRow}
        >
          <MotiView
            from={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 700 }}
          >
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#fff' }]}> 
              <Ionicons name="logo-google" size={24} color="#ea4335" />
            </TouchableOpacity>
          </MotiView>
          <MotiView
            from={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 800 }}
          >
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#fff' }]}> 
              <Ionicons name="logo-facebook" size={24} color="#1877f3" />
            </TouchableOpacity>
          </MotiView>
          <MotiView
            from={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 900 }}
          >
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#fff' }]}> 
              <Ionicons name="logo-apple" size={24} color="#000" />
            </TouchableOpacity>
          </MotiView>
        </MotiView>
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}> 
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 260,
    zIndex: 0,
  },
  bgIllustration: {
    position: 'absolute',
    top: 0,
    // right, width, height, opacity will be set inline for responsiveness and animation
    zIndex: 0,
  },
  logoWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
    marginTop: 30,
  },
  logoCircle: {
    backgroundColor: '#1e90ff',
    borderRadius: 40,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1e90ff',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingTop: 48,
    paddingBottom: 32,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'stretch',
    zIndex: 1,
  },
  title: {
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    color: "#6c757d",
    marginBottom: 32,
    textAlign: 'center',
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e9ecef",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#adb5bd",
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 8,
  },
  socialButton: {
    padding: 16,
    borderRadius: 32,
    marginHorizontal: 8,
    shadowColor: "#1e90ff",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  registerText: {
    color: "#6c757d",
    fontSize: 15,
  },
  registerLink: {
    color: "#1e90ff",
    fontWeight: "bold",
    fontSize: 15,
  },
}); 