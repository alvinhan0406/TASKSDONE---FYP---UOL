import React, {useState} from "react";
import {View, StyleSheet, TextInput, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import {Calendar} from "react-native-calendars";
import {Ionicons} from '@expo/vector-icons';

function MyCalendar() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState({});

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setNote(notes[day.dateString] || "");
  };
  const handleNoteChange = (text) => {
    setNote(text);
  };
  const handleSaveNote = () => {
    setNotes({...notes, [selectedDay]: note});
    setSelectedDay(null);
    setNote("");
  };
  const handleDeleteNote = (date) => {
    const newNotes = {... notes};
    delete newNotes[date];
    setNotes(newNotes);
  };
  return (
    <View style= {styles.container}>
      <ScrollView>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={notes}
        />
        {selectedDay && (
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>{selectedDay}</Text>
            <TextInput
              style={styles.noteInput}
              multiline={true}
              placeholder="Add a note"
              value={note}
              onChangeText={handleNoteChange}
            />
            <Button title="Save" onPress={handleSaveNote} />
          </View>
        )}
        {Object.entries(notes).map(([date, noteText]) => (
          <View key={date} style={styles.noteContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteNote(date)}>
              <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.noteTitle}>{date}</Text>
            <Text style={styles.noteText}>{noteText}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4682b4",
  },
  noteContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noteInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default MyCalendar;