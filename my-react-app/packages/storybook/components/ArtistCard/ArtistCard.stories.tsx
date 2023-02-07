import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import ArtistCard from './ArtistCard';
import { Layout } from '@ui-kitten/components';
import { FlatList, View } from 'react-native';

const ArtistCardMeta: ComponentMeta<typeof ArtistCard> = {
  title: 'ArtistCard',
  component: ArtistCard,
  argTypes: {},
  args: {
    image: require('../../assets/images/artist-1.png'),
    title: 'Jenny Wilson',
    subtitle: '687,856 followers',
    ImageContainerStyle: {
      width: 150,
      height: 150,
    },
    ImageStyle: {
      width: 100,
      height: 100,
    },
  },
};

export default ArtistCardMeta;

type ArtistCardStory = ComponentStory<typeof ArtistCard>;

export const Basic: ArtistCardStory = (args) => (
  <Layout level="4" style={{ padding: 24 }}>
    <ArtistCard {...args} />
  </Layout>
);

export const Grid: ArtistCardStory = (args) => {
  return (
    <Layout level="4" style={{ padding: 24 }}>
      <FlatList
        data={[0, 1, 2, 3].map((it) => args)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginRight: index % 2 == 0 ? 5 : 0,
              marginLeft: index % 2 == 0 ? 0 : 5,
              marginBottom: 24,
            }}
          >
            <ArtistCard {...item} />
          </View>
        )}
        numColumns={2}
      />
    </Layout>
  );
};
