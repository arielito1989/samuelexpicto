import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, useColorScheme, ActivityIndicator } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { Colors } from '@/constants/Colors';
import { Pictogram } from '@/db/database';

const PictogramGrid = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = getStyles(colorScheme);
  const db = useSQLiteContext();
  const [pictograms, setPictograms] = useState<Pictogram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPictograms() {
      try {
        setLoading(true);
        const result = await db.getAllAsync<Pictogram>('SELECT * FROM pictograms');
        setPictograms(result);
      } catch (error) {
        console.error("Failed to load pictograms from DB", error);
      } finally {
        setLoading(false);
      }
    }
    loadPictograms();
  }, [db]);

  const renderItem = ({ item }: { item: Pictogram }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color={Colors[colorScheme].tint} style={{ flex: 1 }}/>;
  }

  return (
    <FlatList
      data={pictograms}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      contentContainerStyle={styles.list}
    />
  );
};

const getStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  list: {
    alignItems: 'center',
  },
  itemContainer: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    backgroundColor: Colors[colorScheme].surface,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
    color: Colors[colorScheme].text,
    fontWeight: '500',
  },
});

export default PictogramGrid;
