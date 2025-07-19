import React, { useRef, useState } from "react";
import { View, Text, Image, FlatList, Dimensions, StyleSheet, useWindowDimensions } from "react-native";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";

const slides = [
  {
    key: "1",
    title: "Book Trucks Instantly",
    desc: "Get a truck at your doorstep in minutes. Fast, reliable, and easy.",
    image: require("../assets/illustrations/onboard1.png"),
  },
  {
    key: "2",
    title: "Track Your Ride",
    desc: "Live tracking, transparent pricing, and trusted drivers.",
    image: require("../assets/illustrations/onboard2.png"),
  },
  {
    key: "3",
    title: "Move Anything, Anytime",
    desc: "From furniture to freight, Truckzy moves it all for you.",
    image: require("../assets/illustrations/onboard3.png"),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const flatListRef = useRef();
  const { width, height } = useWindowDimensions();

  const handleNext = () => {
    if (index < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: index + 1 });
    } else {
      navigation.replace("Login");
    }
  };

  const isLarge = width > 400;
  const imageSize = isLarge ? 260 : width * 0.6;
  const paddingH = isLarge ? 32 : 16;

  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}> 
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width, paddingHorizontal: paddingH }]}> 
            <MotiView
              from={{ opacity: 0, translateY: 40 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 600 }}
              style={styles.illustrationWrap}
            >
              <Image source={item.image} style={{ width: imageSize, height: imageSize, resizeMode: 'contain' }} />
            </MotiView>
            <Text style={[styles.slideTitle, { fontSize: isLarge ? 26 : 20 }]}>{item.title}</Text>
            <Text style={[styles.slideDesc, { fontSize: isLarge ? 16 : 14 }]}>{item.desc}</Text>
          </View>
        )}
        keyExtractor={item => item.key}
      />
      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]}
          />
        ))}
      </View>
      <View style={[styles.buttonWrap, { paddingHorizontal: paddingH }]}> 
        <AppButton title={index === slides.length - 1 ? "Get Started" : "Next"} onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationWrap: {
    marginBottom: 32,
  },
  slideTitle: {
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 12,
    textAlign: 'center',
  },
  slideDesc: {
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 32,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    width: 28,
  },
  dotActive: {
    backgroundColor: '#1e90ff',
  },
  dotInactive: {
    backgroundColor: '#e9ecef',
  },
  buttonWrap: {
    marginBottom: 40,
  },
}); 