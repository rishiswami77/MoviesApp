import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Dimensions,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.44;

/* ============================================================
   TYPES
============================================================ */
interface Movie {
  id: number;
  title: string;
  rating: number;
  poster: string;
  trailer: string;
}

interface MovieCardProps {
  movie: Movie;
  theme: ThemeMode;
}

type ThemeMode = "dark" | "light";

interface ThemeConfig {
  bg: string;
  text: string;
  card: string;
  border: string;
}

/* ============================================================
   DATA
============================================================ */

interface Movie {
  id: number;
  title: string;
  rating: number;
  poster: string;
  trailer: string;
}

const DEMO_MOVIES: Movie[] = [
  {
    id: 2,
    title: "The Dark Knight",
    rating: 5,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailer: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Interstellar",
    rating: 5,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    title: "Inception",
    rating: 5,
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    trailer: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 7,
    title: "The Shawshank Redemption",
    rating: 5,
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 8,
    title: "Forrest Gump",
    rating: 5,
    poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    trailer: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 9,
    title: "Fight Club",
    rating: 5,
    poster: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 11,
    title: "The Lion King",
    rating: 5,
    poster: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg",
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 12,
    title: "Avengers: Endgame",
    rating: 5,
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    trailer: "https://www.w3schools.com/html/movie.mp4",
  },
];


const TAGS = [
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Horror",
  "Romance",
  "Thriller",
  "Animation",
  "Fantasy",
  "Documentary",
];

const themes: Record<ThemeMode, ThemeConfig> = {
  dark: {
    bg: "#0D0D0D",
    text: "#fff",
    card: "#161616",
    border: "#333",
  },
  light: {
    bg: "#F5F5F5",
    text: "#000",
    card: "#fff",
    border: "#CCC",
  },
};

/* ============================================================
   COMPONENTS
============================================================ */

/* ⭐ Rating Stars */
function RatingStars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: "row", marginTop: 5 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      ))}
    </View>
  );
}

/* 🎬 Movie Card */
function MovieCard({ movie, theme }: MovieCardProps) {
  const scale = useSharedValue(1);
  const [preview, setPreview] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1), setPreview(false))
      }
      onLongPress={() => setPreview(true)}
    >
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: themes[theme].card },
          animatedStyle,
        ]}
      >
        {preview ? (
          <Video
            source={{ uri: movie.trailer }}
            style={styles.cardImage}
            shouldPlay
            isLooping
            resizeMode={ResizeMode.COVER}
          />
        ) : (
          <Image source={{ uri: movie.poster }} style={styles.cardImage} />
        )}

        <View style={styles.cardInfo}>
          <Text style={[styles.cardTitle, { color: themes[theme].text }]}>
            {movie.title}
          </Text>
          <RatingStars rating={movie.rating} />
        </View>
      </Animated.View>
    </Pressable >
  );
}

/* ============================================================
   MAIN SCREEN
============================================================ */

export default function HomeScreen() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  return (
    <View style={[styles.container, { backgroundColor: themes[theme].bg }]}>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>🎬 Movie Explorer</Text>

        <Pressable style={styles.themeBtn}
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Ionicons
            name={theme === "dark" ? "sunny-outline" : "moon-outline"}
            size={28}
            color="#fff"
          />
        </Pressable>
      </View>

      {/* TAGS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagScroll}
      >
        {TAGS.map((tag) => (
          <Pressable key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search movies..."
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
          <Ionicons name="search" size={20} color="#fff" />
        </View>
      </View>

      {/* TRENDING */}
      <Text style={styles.sectionTitle}>🔥 Trending Now</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingHorizontal: 15, height: 800 }}
      >
        {DEMO_MOVIES.map((m) => (
          <MovieCard key={m.id} movie={m} theme={theme} />
        ))}
      </ScrollView>

      {/* AI RECOMMENDED */}
      <Text style={styles.sectionTitle}>🤖 Recommended For You</Text>

      <ScrollView contentContainerStyle={styles.movieGrid}>
        {DEMO_MOVIES.map((m) => (
          <MovieCard key={m.id} movie={m} theme={theme} />
        ))}
      </ScrollView>

    </View>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  navbar: {
    padding: 15,
    backgroundColor: "#101010",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },

  themeBtn: {
    padding: 8,
  },

  tagScroll: {
    flexDirection: "row",
    gap: 10,
    height: 180,
    paddingHorizontal: 10,
    paddingTop: 15,
  },

  tag: {
    backgroundColor: "#1C1C1C",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 20,
    height: 40,
    borderWidth: 1,
    borderColor: "#333",
  },

  tagText: {
    color: "#fff",
    fontSize: 14,
  },

  searchContainer: { paddingHorizontal: 15 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: "#fff",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },

  movieGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    // paddingHorizontal: 15,
    paddingBottom: 100,
  },

  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    overflow: "hidden",
  },

  cardImage: {
    width: "100%",
    height: 210,
  },

  cardInfo: {
    padding: 10,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
