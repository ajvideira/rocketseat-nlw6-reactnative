import React from 'react';

import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';

import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';

import { styles } from './styles';
import { Member } from '../../components/Member';
import { CategorySelect } from '../../components/CategorySelect';
import { useState } from 'react';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';

import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { useNavigation } from '@react-navigation/native';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>();

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseModal() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    const newAppoitment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appoitments = storage ? JSON.parse(storage) : [];
    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appoitments, newAppoitment])
    );

    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Background>
        <ScrollView>
          <Background>
            <Header title="Agendar partida" />

            <Text
              style={[
                styles.label,
                { marginLeft: 24, marginTop: 36, marginBottom: 18 },
              ]}
            >
              Categoria
            </Text>

            <CategorySelect
              hasCheckbox={true}
              setCategory={handleCategorySelect}
              categorySelected={category}
            />

            <View style={styles.form}>
              <RectButton onPress={handleOpenGuilds}>
                <View style={styles.select}>
                  {guild?.id ? (
                    <GuildIcon guildId={guild.id} iconId={guild.icon} />
                  ) : (
                    <View style={styles.image} />
                  )}
                  <View style={styles.selectBody}>
                    <Text style={styles.label}>
                      {guild ? guild.name : 'Selecione um servidor'}
                    </Text>
                  </View>

                  <Feather
                    name="chevron-right"
                    color={theme.colors.heading}
                    size={18}
                  />
                </View>
              </RectButton>

              <View style={styles.field}>
                <View>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Dia e mês
                  </Text>

                  <View style={styles.column}>
                    <SmallInput
                      maxLength={2}
                      onChangeText={setDay}
                      value={day}
                    />
                    <Text style={styles.divider}>/</Text>
                    <SmallInput
                      maxLength={2}
                      onChangeText={setMonth}
                      value={month}
                    />
                  </View>
                </View>

                <View>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Hora e minuto
                  </Text>

                  <View style={styles.column}>
                    <SmallInput
                      maxLength={2}
                      onChangeText={setHour}
                      value={hour}
                    />
                    <Text style={styles.divider}>:</Text>
                    <SmallInput
                      maxLength={2}
                      onChangeText={setMinute}
                      value={minute}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.field, { marginBottom: 12 }]}>
                <Text style={styles.label}>Descrição</Text>
                <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
              </View>
              <TextArea
                multiline
                maxLength={100}
                numberOfLines={5}
                autoCorrect={false}
                onChangeText={setDescription}
                value={description}
              />

              <View style={styles.footer}>
                <Button title="Agendar" onPress={handleSave} />
              </View>
            </View>
          </Background>
        </ScrollView>
      </Background>
      <ModalView visible={openGuildsModal} closeModal={handleCloseModal}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
