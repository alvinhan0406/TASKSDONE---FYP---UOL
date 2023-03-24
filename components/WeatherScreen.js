import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); //getting permission
      if (status !== "granted") {
        setErrorMsg("Permission has not been granted");
        return;
      }

      console.log("Permission has been granted");

      let loc = await Location.getCurrentPositionAsync({});

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=44f24129d2662db0c78f2f7a6b1320e7&units=metric`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((reponse) => reponse.json())
        .then((json) => {
          console.log(json);
          setLocation(json);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

 if (errorMsg !== null) {
    //error situation
    return (
      <View style={styles.container}>
        <Text>Error found: {errorMsg} </Text>
        <StatusBar style="auto" />
      </View>
    );
  } else if (location !== null) {
    //success situation
    return (
     <View style={styles.container}>
       <Image
          source={{
           uri: `https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`,
         }}
         style={{ width: 125, height: 125 }}
        />
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Location:</Text>
          <Text style={styles.infoText}>{location.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Temperature:</Text>
          <Text style={styles.infoText}>{location.main.temp}°C</Text>
        </View>
          <View style={styles.infoBox}>
          <Text style={styles.infoText}>Current weather:</Text>
          <Text style={styles.infoText}>{location.weather[0].main}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Description:</Text>
          <Text style={styles.infoText}>{location.weather[0].description}</Text>
          </View>
      </View>
    );
    } else {
    //loading
    return (
      <View style={[styles.loading, styles.horizontal]}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#4682b4`,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});