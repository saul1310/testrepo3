import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [nextId, setNextId] = useState(1);

  const addTask = () => {
    if (text.trim() === '') return;
    setTasks([...tasks, { id: nextId, text, completed: false }]);
    setNextId(nextId + 1);
    setText('');
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'active') return t.completed; 
    return t.completed;
  });


  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Add a new task"
          onChangeText={setText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {['all', 'active', 'completed'].map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f as any)}>
            <Text style={[styles.filterText, filter === f && styles.activeFilter]}>{f.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.list}>
        {filteredTasks.map(task => (
          <View key={task.id} style={styles.taskRow}>
            <TouchableOpacity onPress={() => toggleComplete(task.id)} style={styles.checkbox}>
              <Text style={styles.checkText}>{task.completed ? '✔' : ''}</Text>
            </TouchableOpacity>
            <Text style={[styles.taskText, task.completed && styles.taskDone]}>{task.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(task.id)}>
              <Text style={styles.deleteButton}>🗑</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.count}>
        {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} {filter !== 'all' && `(${filter})`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 12,
    borderRadius: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 16,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    fontSize: 18,
    marginLeft: 10,
    color: '#cc0000',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  activeFilter: {
    fontWeight: 'bold',
    color: '#000',
  },
  count: {
    textAlign: 'center',
    marginTop: 10,
    color: '#444',
    fontSize: 14,
  },
});

export default TodoApp;
