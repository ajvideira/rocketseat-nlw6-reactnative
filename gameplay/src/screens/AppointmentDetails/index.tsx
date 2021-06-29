import React from 'react';

import { FlatList, ImageBackground, Platform, Text, View } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';

import { Fontisto } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';

import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';

import { styles } from './styles';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { Load } from '../../components/Load';
import { Share } from 'react-native';

import * as Linking from 'expo-linking';

type Params = {
  appointmentSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
};

export function AppointmentDetails() {
  const route = useRoute();
  const { appointmentSelected } = route.params as Params;
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  async function fetchGuildWidget() {
    try {
      console.log(`guild.id: ${appointmentSelected.guild.id}`);
      const response = await api.get(
        `/guilds/${appointmentSelected.guild.id}/widget.json`
      );
      setWidget(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Verifique as configurações do servidor. Será que o Widget está habilitado?'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleShareInvitation() {
    console.log(widget.instant_invite);
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${appointmentSelected.guild.name}`
        : widget.instant_invite;

    await Share.share({ message, url: widget.instant_invite });
  }

  async function handleOpenGuild() {
    await Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          appointmentSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{appointmentSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{appointmentSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />

          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
          />
          {appointmentSelected.guild.owner && (
            <View style={styles.footer}>
              <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
            </View>
          )}
        </>
      )}
    </Background>
  );
}
