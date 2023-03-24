import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TasksScreen from './components/TasksScreen';
import WeatherScreen from './components/WeatherScreen';
import CalendarScreen from './components/CalendarScreen';
import TimerScreen from './components/TimerScreen';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="TasksDone"
          component={TasksScreen}
          options={{
            tabBarIcon:({color,size}) => (
              <Ionicons name="md-checkbox" color="skyblue" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherScreen}
          options={{
            tabBarIcon:({color,size}) => (
              <Ionicons name="md-partly-sunny" color="skyblue" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarIcon:({color,size}) => (
              <Ionicons name="md-calendar" color="skyblue" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Timer"
          component={TimerScreen}
          options={{
            tabBarIcon:({color,size}) => (
              <Ionicons name="md-time" color="skyblue" size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

