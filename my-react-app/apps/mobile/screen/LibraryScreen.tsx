import { ArtistCard, SearchInput } from "@my-workspace/my-ui/components";
import { Layout, Text } from "@ui-kitten/components";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { TRENDING } from "../data";

const { width } = Dimensions.get("screen");

const CARD_SIZE = width / 2 - 24;

const LibraryScreen = () => {
  return (
    <Layout
      level="4"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Layout level="4" style={{ flex: 1 }}>
        <View style={{ padding: 24 }}>
          <SearchInput />
          <Text category="h3" style={{ marginVertical: 16 }}>
            Trending
          </Text>
          <FlatList
            data={TRENDING}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  marginRight: index % 2 == 0 ? 5 : 0,
                  marginLeft: index % 2 == 0 ? 0 : 5,
                  marginBottom: 24,
                }}
              >
                <ArtistCard
                  image={item.image}
                  title={item.title}
                  subtitle={item.artistName}
                  ImageContainerStyle={{ width: CARD_SIZE, height: CARD_SIZE }}
                  ImageStyle={{ width: CARD_SIZE, height: CARD_SIZE }}
                />
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        </View>
      </Layout>
    </Layout>
  );
};

export default LibraryScreen;
