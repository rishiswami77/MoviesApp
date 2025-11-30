import React from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Movies</Text>
      </View>
      {/* Tags */}
      <View style={styles.tagContainer}>
        <TouchableOpacity style={styles.tag}>
          <Text style={styles.tagText}>Action</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag}>
          <Text style={styles.tagText}>Comedy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag}>
          <Text style={styles.tagText}>Drama</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag}>
          <Text style={styles.tagText}>Sci-Fi</Text>
        </TouchableOpacity>
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movies..."
          placeholderTextColor="#aaa"
        />
      </View>



      {/* Main Content: Movie Cards */}
      <ScrollView contentContainerStyle={styles.movieContainer}>
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://example.com/inception.jpg' }} // Replace with actual image URL
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Inception</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://example.com/darkknight.jpg' }} // Replace with actual image URL
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>The Dark Knight</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://example.com/interstellar.jpg' }} // Replace with actual image URL
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Interstellar</Text>
        </View>
        {/* Add more movie cards here */}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 MovieApp</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    paddingTop: 50,
    // paddingHorizontal: 20,
  },
  navbar: {
    backgroundColor: '#111', // Dark navbar
    paddingVertical: 10,
    // alignItems: 'center',
    padding: 5,
  },
  navbarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  searchInput: {
    width: '80%',
    padding: 10,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  tag: {
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  movieContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '45%',
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  footer: {
    backgroundColor: '#111',
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#777',
    fontSize: 12,
  },
});
