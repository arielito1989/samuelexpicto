import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import PictogramGrid from '@/components/PictogramGrid';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Comunicador</Text>
      <PictogramGrid />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Un poco de espacio superior
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
