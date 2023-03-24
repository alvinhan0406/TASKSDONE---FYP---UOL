import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerHistory, setTimerHistory] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(false);
    setTimerHistory([...timerHistory, elapsedTime]);
  };

  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  return (
    <View style={styles.container}>
      <View style={styles.timerBox}>
        <Text style={styles.timer}>
          {hours}:{minutes < 10 ? "0" : ""}
          {minutes}:{seconds < 10 ? "0" : ""}
          {seconds}
        </Text>
      </View>
      <View style={styles.buttons}>
        {!isRunning && (
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        {isRunning && (
          <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.stopButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
      {timerHistory.length > 0 && (
        <View style={styles.historyBox}>
          <Text style={styles.historyTitle}>History</Text>
          {timerHistory.map((time, index) => (
            <Text style={styles.historyItem} key={index}>
              {index + 1}. {Math.floor(time / 3600)}h{" "}
              {Math.floor((time % 3600) / 60)}m {time % 60}s
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `#4682b4`,
  },
  timerBox: {
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  timer: {
    fontSize: 60,
    color: "#000000",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
  },
  startButton: {
    backgroundColor: "#32cd32",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: "#dc143c",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 10,
  },
  stopButton: {
    backgroundColor: "#dc143c",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 10,
  },
  historyBox: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default Timer;