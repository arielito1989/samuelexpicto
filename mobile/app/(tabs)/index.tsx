import { StyleSheet, SafeAreaView, useColorScheme } from 'react-native';
import PictogramGrid from '@/components/PictogramGrid';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = getStyles(colorScheme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Comunicador</ThemedText>
        <PictogramGrid />
      </ThemedView>
    </SafeAreaView>
  );
}

const getStyles = (colorScheme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors[colorScheme].background,
  },
  container: {
    flex: 1,
    paddingTop: 40, // Un poco de espacio superior
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
