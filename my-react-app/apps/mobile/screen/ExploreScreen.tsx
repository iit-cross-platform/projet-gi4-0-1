import { Dimensions, FlatList, View, TouchableOpacity } from "react-native";

import { Layout, Text } from "@ui-kitten/components";
import { ARTISTS } from "../data";
import { ArtistCard, SearchInput } from "@my-workspace/my-ui/components";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const CARD_SIZE = width / 2 - 24;

const ExploreScreen = ({ navigation }) => {
  return (
    <Layout level="4" style={{ flex: 1 }}>
      <View style={{ padding: 24 }}>
        <SearchInput />
        <Text category="h3" style={{ marginVertical: 16 }}>
          Artiste
        </Text>
        <FlatList
          data={ARTISTS}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                marginRight: index % 2 == 0 ? 5 : 0,
                marginLeft: index % 2 == 0 ? 0 : 5,
                marginBottom: 24,
              }}
              onPress={() =>
                navigation.navigate({
                  name: "Player",
                  params: { artist: item },
                })
              }
            >
              <ArtistCard
                image={item.image}
                title={item.name}
                subtitle={item.followers}
                backgroundColor={item.backgroundColor}
                ImageContainerStyle={{ width: CARD_SIZE, height: CARD_SIZE }}
              />
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    </Layout>
  );
};

export default ExploreScreen;
