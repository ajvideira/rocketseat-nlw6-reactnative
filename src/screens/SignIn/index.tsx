import React from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';

import illustrationImg from '../../assets/illustration.png';

import { styles } from './styles';
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function SignIn() {
  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    //navigation.navigate('Home');
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={illustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se{'\n'} e organize suas{'\n'} jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}favoritos com seus amigos
          </Text>
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon title="Entre com Discord" onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
}
