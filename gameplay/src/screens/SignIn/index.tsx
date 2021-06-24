import React from 'react';
import { Image, StatusBar, Text, View } from 'react-native';

import illustrationImg from '../../assets/illustration.png';
import { styles } from './styles';

import { ButtonIcon } from '../../components/ButtonIcon';
import { useNavigation } from '@react-navigation/native';

export function SignIn() {
  const navigation = useNavigation();

  function handleSignIn() {
    navigation.navigate('Home');
  }

  return (
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
        <ButtonIcon title="Entre com Discord" onPress={handleSignIn} />
      </View>
    </View>
  );
}
