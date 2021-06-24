import { Inter_100Thin } from '@expo-google-fonts/inter';
import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: Inter_100Thin,
    backgroundColor: theme.colors.secondary40,
    marginVertical: 21,
    alignSelf: 'flex-end',
  },
});
