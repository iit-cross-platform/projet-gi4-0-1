import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "@ui-kitten/components";

import ExploreScreen from "../screen/ExploreScreen";
import ProfileScreen from "../screen/ProfileScreen";
import LibraryScreen from "../screen/LibraryScreen";
import HomeScreen from "../screen/HomeScreen";
import WelcomeComponent from "../screen/WelcomeComponent.native";

import {
  Octicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const Stack = createStackNavigator();

const HomeStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: { color: theme["text-basic-color"] },
        headerStyle: {
          backgroundColor: theme["background-basic-color-4"],
        },
      }}
    >
      {/* <Stack.Screen name={"Welcome"} component={WelcomeComponent} /> */}
      <Stack.Screen name={"Explore"} component={ExploreScreen} />
      <Stack.Screen
        name={"Player"}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();

const TabNavigation = () => {
  const theme = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: { color: theme["text-basic-color"] },
        headerStyle: {
          backgroundColor: theme["background-basic-color-4"],
          shadowColor: "transparent",
        },
        tabBarStyle: {
          backgroundColor: theme["background-basic-color-2"],
        },
        tabBarActiveTintColor: theme["text-basic-color"],
        tabBarInactiveTintColor: theme["text-disabled-color"],
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon({ focused }) {
            return (
              <Octicons
                name="home"
                size={24}
                color={
                  focused
                    ? theme["text-basic-color"]
                    : theme["text-disabled-color"]
                }
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon({ focused }) {
            return (
              <MaterialCommunityIcons
                name="youtube-subscription"
                size={24}
                color={
                  focused
                    ? theme["text-basic-color"]
                    : theme["text-disabled-color"]
                }
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon({ focused }) {
            return (
              <FontAwesome
                name="user"
                size={24}
                color={
                  focused
                    ? theme["text-basic-color"]
                    : theme["text-disabled-color"]
                }
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
