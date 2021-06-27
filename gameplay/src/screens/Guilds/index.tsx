import React from 'react';

import { FlatList, View } from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
  handleGuildSelect: (guildSelect: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: Props) {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '2',
      name: 'Tropicália',
      icon: null,
      owner: false,
    },
    {
      id: '3',
      name: 'Tropicália',
      icon: null,
      owner: false,
    },
    {
      id: '4',
      name: 'Tropicália',
      icon: null,
      owner: false,
    },
    {
      id: '5',
      name: 'Tropicália',
      icon: null,
      owner: false,
    },
    {
      id: '6',
      name: 'Tropicália',
      icon: null,
      owner: false,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        style={styles.guilds}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
        ListHeaderComponent={() => <ListDivider isCentered />}
      />
    </View>
  );
}
