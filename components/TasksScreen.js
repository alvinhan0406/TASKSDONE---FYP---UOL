import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native';
import Task from './Task';

export default function TasksScreen(){
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [completedTasks, setCompletedTasks ] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask('');
  }
  const completeTask = (index => {
    let itemsCopy = [...taskItems];
    setCompletedTasks([...completedTasks, itemsCopy[index]])
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  })
  const deleteTask = (index => {
    let completedTasksCopy = [...completedTasks];
    completedTasksCopy.splice(index,1);
    setCompletedTasks(completedTasksCopy);
  })
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.firstTitle}>Todays's Tasks</Text>
        <ScrollView style={styles.items}>
        {
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} completed={false} onPress={() => completeTask(index)} /> 
              </TouchableOpacity>
            )
          })
        }
        </ScrollView>
      </View>

      <View style={styles.completedTaskWrapper}>
        <Text style={styles.secondTitle}>Completed tasks</Text>

        <ScrollView style={styles.items}>
        {
          completedTasks.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
                <Task text={item} completed={true} onPress={() => deleteTask(index)} /> 
              </TouchableOpacity>
            )
          })
        }
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={"Add a task"} value={task}
        onChangeText={text=>setTask (text)} />
        
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#4682b4`,  
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  firstTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 100,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
