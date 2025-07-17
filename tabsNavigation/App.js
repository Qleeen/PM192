
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/HOME';
import Profile from './screens/PROFILE';
import Settings from './screens/SETTINGS';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name == 'Home') {
                            iconName = 'home';
                        } else if (route.name == 'Profile') {
                            iconName = 'person';
                        } else if (route.name == 'Settings') {
                            iconName = 'settings';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#0078FF',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        paddingBottom: 5,
                        height: 60,
                    },
                })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}