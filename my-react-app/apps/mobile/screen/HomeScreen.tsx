import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { UpNextButton, RoundButtonMusic, Cover } from "@my-workspace/my-ui";
import { AntDesign, Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";

import { Layout, Text, useTheme } from "@ui-kitten/components";
import { ArtistCard } from "@my-workspace/my-ui/components";

const { width } = Dimensions.get("screen");

const COVER_SIZE = width - 24 * 2;

const HomeScreen = ({ navigation, route }) => {
  const artist = route.params.artist;
  const theme = useTheme();

  const [playbackObject, setPlaybackObject] = useState<Audio.Sound>();

  const [currentDuration, setCurrentDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const loadAudio = async () => {
    try {
      const { sound, status } = await Audio.Sound.createAsync(
        artist.playlist[0].audio
      );

      setPlaybackObject(() => sound);

      sound.setOnPlaybackStatusUpdate(audioStatusUpdateHandler);

      if ("durationMillis" in status) {
        setMaxDuration(status.durationMillis);
        setAudioLoaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const audioStatusUpdateHandler = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      // Update your UIss for the unloaded state
    } else {
      // Update your UI for the loaded state
      if (status.isPlaying) {
        setIsPlaying(true);
        // Update your UI for the playing state
        // setCurrentDuration(status.positionMillis);
        // setCurrentDuration(status.positionMillis);
        // setCurrentDuration(() => status.positionMillis);
      } else {
        // Update your UI for the paused state
      }
      if (status.isBuffering) {
        // Update your UI for the buffering state
      }
      if (status.didJustFinish && !status.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        setCurrentDuration(0);
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    loadAudio();
  }, [artist]);

  useEffect(() => {
    return () => {
      if (playbackObject) {
        playbackObject.unloadAsync().catch((err) => console.log(err));
      }
    };
  }, [playbackObject]);

  //   let interval;

  const convertSecondToHHMMSS = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);

    let timeString = "";
    if (hours !== 0) {
      timeString += `${hours.toString().padStart(2, "0")}:`;
    }
    timeString += `${minutes
      .toFixed(0)
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    return timeString;
  };

  //   useEffect(() => {
  //     if (currentDuration >= maxDuration) {
  //       setIsPlaying(false);
  //       setCurrentDuration(maxDuration);
  //     }
  //     if (currentDuration < 0) {
  //       setCurrentDuration(0);
  //     }
  //   }, [currentDuration]);
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentDuration((oldValue) => oldValue + 1000);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Layout level="4" style={{ flex: 1, paddingTop: 25 }}>
      <Layout
        level="4"
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <RoundButtonMusic
          backgroundColor="transparent"
          size={70}
          icon={<AntDesign name="left" size={24} color="white" />}
          onClickButton={() => {
            navigation.goBack();
          }}
        />
        <Text category="h5">Now Playing</Text>
        <View style={{ width: 70 }} />
      </Layout>
      <ScrollView>
        <View style={{ paddingHorizontal: 24 }}>
          {/* <Cover
          borderRadius={10}
          imageUrl="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2020%2F01%2Feminem-1-2000.jpg"
        /> */}
          <ArtistCard
            image={artist.image}
            backgroundColor={artist.backgroundColor}
            ImageContainerStyle={{
              borderRadius: 15,
              width: COVER_SIZE,
              height: COVER_SIZE,
            }}
            ImageStyle={{
              borderRadius: 15,
              width: COVER_SIZE * 0.8,
              height: COVER_SIZE * 0.8,
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
          <Text category="h5">{artist.playlist[0].name}</Text>
          <Text category="s1" appearance="hint">
            {artist.name}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 24, marginVertical: 16 }}>
          <Slider
            value={currentDuration}
            onValueChange={async (value) => {
              await playbackObject
                ?.setPositionAsync(value)
                .then((status: AVPlaybackStatusSuccess) =>
                  setCurrentDuration((old) => status.positionMillis)
                );
            }}
            //   style={{ width: 200, height: 40 }}
            minimumValue={0}
            step={500}
            maximumValue={maxDuration}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FDFDFD"
            thumbTintColor="#F00DFD"
          />
        </View>

        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{convertSecondToHHMMSS(currentDuration / 1000)}</Text>
          <Text>
            {convertSecondToHHMMSS((maxDuration - currentDuration) / 1000)}
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RoundButtonMusic
            icon={<Feather name="chevrons-left" size={24} color="white" />}
            onClickButton={async () => {
              await playbackObject
                ?.setPositionAsync(
                  currentDuration - 10000 < 0 ? 0 : currentDuration - 10000
                )
                .then((status: AVPlaybackStatusSuccess) =>
                  setCurrentDuration((val) => status.positionMillis)
                );
              //   setCurrentDuration((oldValue) => oldValue - 10);
            }}
            size={50}
          />
          <RoundButtonMusic
            icon={<Feather name="chevron-left" size={24} color="white" />}
            onClickButton={async () => {
              await playbackObject
                ?.setPositionAsync(
                  currentDuration - 2000 < 0 ? 0 : currentDuration - 2000
                )
                .then((status: AVPlaybackStatusSuccess) =>
                  setCurrentDuration((oldValue) => status.positionMillis)
                );
              //   setCurrentDuration((oldValue) => oldValue - 2);
            }}
            size={50}
          />
          <RoundButtonMusic
            backgroundColor={theme["background-basic-color-2"]}
            icon={
              isPlaying ? (
                <FontAwesome name="pause" size={24} color="white" />
              ) : (
                <FontAwesome name="play" size={24} color="white" />
              )
            }
            onClickButton={async () => {
              if (!audioLoaded) return;
              if (isPlaying) {
                setIsPlaying(false);
                await playbackObject?.pauseAsync();
              } else {
                setIsPlaying(true);
                await playbackObject?.playAsync();
              }
              //   setIsPlaying(!isPlaying);
            }}
            size={70}
          />
          <RoundButtonMusic
            icon={<Feather name="chevron-right" size={24} color="white" />}
            onClickButton={async () => {
              await playbackObject
                ?.setPositionAsync(
                  currentDuration + 2000 > maxDuration
                    ? maxDuration
                    : currentDuration + 2000
                )
                .then((status: AVPlaybackStatusSuccess) =>
                  setCurrentDuration((oldValue) => status.positionMillis)
                );
              //   setCurrentDuration((oldValue) => oldValue + 2);
            }}
            size={50}
          />
          <RoundButtonMusic
            icon={<Feather name="chevrons-right" size={24} color="white" />}
            onClickButton={async () => {
              await playbackObject
                ?.setPositionAsync(
                  currentDuration + 10000 > maxDuration
                    ? maxDuration
                    : currentDuration + 10000
                )
                .then((status: AVPlaybackStatusSuccess) =>
                  setCurrentDuration((oldValue) => status.positionMillis)
                );
              //   setCurrentDuration((oldValue) => oldValue + 10);
            }}
            size={50}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <UpNextButton
          backgroundColor="red"
          borderRadius="10"
          text="Hello"
          textColor="#FFFF00"
          type="button"
        />
        <UpNextButton
          backgroundColor="red"
          borderRadius="10"
          text="Hello"
          textColor="#562c2c"
          type="link"
        /> */}
          <TouchableOpacity activeOpacity={0.8}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Feather name="chevron-up" size={24} color="white" />
              <Text
                style={{
                  padding: 20,
                  backgroundColor: theme["background-basic-color-2"],
                  borderRadius: 20,
                }}
              >
                Up Next
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
