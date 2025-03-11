import React, {useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'; //my code would not show up unless I used SafeAreaProvider
import { StyleSheet, FlatList, Text, View, TextInput, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from '@rneui/themed'; //the only way I could get a checkbox to appear

// The website: https://reactnative.dev/docs/flatlist?language=typescript helped me structure my code.
// similar names and ids from the example on React Native : Expo Todo List Module Page

//data
const data = [
  {id: 'taskOne', description: 'Quiz 7', completed: false },
  {id: 'taskTwo', description: 'Assignment 3', completed: false },
  {id: 'taskThree', description: 'Figma Lab', completed: false },
  {id: 'taskFour', description: 'Redesign Mobile App', completed: false },
]

//app
const App = () => {
  const [tasks, setTasks] = useState(data);
  const [newTask, setNewTask] = useState('');

  const checkedTask = (id) => {
    setTasks(prevTasks =>
      //Map Function
      //If... else... statement
      //Arrow function from previous assignments
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //new task
  const addNewTask = () => {
    if (newTask.trim()) {
      const newTaskData= {
        //this will add an id for the new task that is created
        //https://stackoverflow.com/questions/74568211/react-id-function
        id: `task${tasks.length + 1}`,
        description: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskData]);
      setNewTask('');
    }
  };

  //https://reactnativeelements.com/docs/components/checkbox

  //checkbox and text, pretty simple
  const renderItem =({item}) => (
    <View style={styles.item}>
      <CheckBox
      checked={item.completed}
      onPress={() => checkedTask(item.id)}
      containerStyle={styles.checkbox}
      />
      <Text style={[styles.title, item.completed && styles.completedText]}>
      {item.description}
      </Text>
    </View>
  );

  //SafeAreaProvider and SafeAreaView
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      />
      <TextInput
      style={styles.input}
      value={newTask}
      onChangeText={setNewTask}
      placeholder="Enter a new task..."
      />
      <Button title="Add" onPress={addNewTask} />
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

//All of my styling is here
//Help from https://reactnative.dev/docs/flatlist?language=typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#efc3e6',
    padding: 19,
    marginVertical: 7,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginLeft: 7,
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#9c89b8'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderColor: '#f0a6ca',
    borderRadius: 5,
  },
  checkbox: {
    backgroundColor: '#efc3e6',
  },
});

export default App;