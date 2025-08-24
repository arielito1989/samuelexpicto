import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

// La URL del backend. NOTA: Si usas un emulador de Android, reemplaza 'localhost' por '10.0.2.2'.
// Si usas un dispositivo físico, usa la dirección IP de tu computadora en la red local.
const API_URL = 'http://localhost:3000/api/pictograms';

const PictogramGrid = () => {
  const [pictograms, setPictograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPictograms = async () => {
      try {
        const response = await axios.get(API_URL);
        setPictograms(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPictograms();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={pictograms}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3} // Ajusta el número de columnas según necesites
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, // Ancho fijo para cada item
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default PictogramGrid;
