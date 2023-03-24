import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskItem = ({text,completed,onPress}) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.square}>
          {completed && <View style={styles.checkedSquare} />}
        </View>
        <Text style={styles.itemText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    item:{
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    square:{
      width: 24,
      height: 24,
      borderColor: "#55BCF6",
      borderWidth: 2,
      borderRadius: 5,
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkedSquare: {
      width: 12,
      height: 12,
      backgroundColor: "#55BCF6",
      borderRadius: 2,
    },
    itemText:{
      flex: 1,
      maxWidth: '80%',
    },
});

export default TaskItem;