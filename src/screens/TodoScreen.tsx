// src/screens/TodoScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useTheme } from '../theme/ThemeContext';
import { Todo } from '../types/todo';
import { FilterType } from '../types/todo';
import DraggableFlatList from 'react-native-draggable-flatlist';

export const TodoScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [todosOrder, setTodosOrder] = useState<string[]>([]);
  
  // Convex queries and mutations
  const todos = useQuery(api.todo.getTodos) || [];
  const addTodo = useMutation(api.todo.addTodo);
  const updateTodo = useMutation(api.todo.updateTodo);
  const deleteTodo = useMutation(api.todo.deleteTodo);

  const activeTodos = todos.filter(todo => !todo.isCompleted);
  const completedTodos = todos.filter(todo => todo.isCompleted);

  const filteredTodos = 
    filter === 'active' ? activeTodos :
    filter === 'completed' ? completedTodos : todos;

  // Initialize todos order when todos change
  React.useEffect(() => {
    if (todos.length > 0 && todosOrder.length === 0) {
      setTodosOrder(todos.map(todo => todo._id));
    }
  }, [todos]);

  // Sort todos based on drag order
  const sortedTodos = React.useMemo(() => {
    if (todosOrder.length === 0) return filteredTodos;
    
    return [...filteredTodos].sort((a, b) => {
      const indexA = todosOrder.indexOf(a._id);
      const indexB = todosOrder.indexOf(b._id);
      return indexA - indexB;
    });
  }, [filteredTodos, todosOrder]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({ 
        title: newTodo.trim(), 
        isCompleted: false,
        createdAt: Date.now()
      });
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: string, isCompleted: boolean) => {
    updateTodo({ id, isCompleted: !isCompleted });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo({ id });
  };

  const clearCompleted = () => {
    completedTodos.forEach(todo => {
      deleteTodo({ id: todo._id });
    });
  };

  // Drag and drop handler
  const onDragEnd = ({ data }: { data: Todo[] }) => {
    const newOrder = data.map(todo => todo._id);
    setTodosOrder(newOrder);
  };

  // Render each todo item for the draggable list
  const renderTodoItem = ({ item, drag, isActive }: { item: Todo; drag: () => void; isActive: boolean }) => (
    <TouchableOpacity
      style={[
        styles.todoItem,
        isActive && styles.todoItemDragging
      ]}
      onLongPress={drag}
      delayLongPress={200}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          item.isCompleted && styles.checkboxCompleted
        ]}
        onPress={() => handleToggleTodo(item._id, item.isCompleted)}
      >
        {item.isCompleted && <Text style={styles.checkIcon}>✓</Text>}
      </TouchableOpacity>
      
      <Text style={[
        styles.todoText,
        item.isCompleted && styles.todoTextCompleted
      ]}>
        {item.title}
      </Text>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTodo(item._id)}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    backgroundImage: {
      width: '100%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    appContainer: {
      flex: 1,
      maxWidth: 540,
      width: '90%',
      alignSelf: 'center',
      marginTop: -100,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 100,
      paddingHorizontal: 24,
      maxWidth: 590,
      width: '90%',
      alignSelf: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 12,
      color: '#ffffff',
    },
    themeToggle: {
      width: 24,
      height: 24,
    },
    inputContainer: {
      backgroundColor: theme.colors.todoBackground,
      borderRadius: 6,
      marginBottom: 24,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    textInput: {
      padding: 20,
      fontSize: 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.todoBackground,
      borderRadius: 6,
    },
    todoList: {
      backgroundColor: theme.colors.todoBackground,
      borderRadius: 6,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      minHeight: 200,
      maxHeight: 400,
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.todoBackground,
    },
    todoItemDragging: {
      backgroundColor: theme.colors.border + '40',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxCompleted: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      backgroundImage: isDark 
        ? 'linear-gradient(135deg, #57ddff, #c058f3)'
        : 'linear-gradient(135deg, #57ddff, #c058f3)',
    },
    checkIcon: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    todoText: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
    },
    todoTextCompleted: {
      textDecorationLine: 'line-through',
      color: theme.colors.completed,
    },
    deleteButton: {
      padding: 5,
    },
    deleteText: {
      color: theme.colors.textSecondary,
      fontSize: 18,
      fontWeight: 'bold',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.todoBackground,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
    },
    itemsLeft: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    filterContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    filterButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    filterText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      fontWeight: '500',
    },
    filterTextActive: {
      color: '#3a7bfd',
    },
    filterTextActiveWhite: {
      color: '#ffffff', // White for "Active" and "Completed"
      fontWeight: 'bold',
    },
    filterTextBold: {
      fontWeight: 'bold',
    },
    clearButton: {
      padding: 4,
    },
    clearText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    dragHint: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontSize: 14,
      marginTop: 20,
      padding: 10,
    },
    emptyState: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyStateText: {
      color: theme.colors.textSecondary,
      fontSize: 16,
    },
    contentContainer: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Dynamic Background Header Image based on Theme */}
      <ImageBackground
        source={isDark 
          ? require('../../assets/bitmap1.jpg')  // Dark mode image
          : require('../../assets/bitmap.jpg')   // Light mode image
        }
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={styles.title}>TODO</Text>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Text style={{ color: '#fff', fontSize: 24 }}>
              {isDark ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <KeyboardAvoidingView
        style={styles.appContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.contentContainer}>
          {/* Input Section */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Create a new todo..."
              placeholderTextColor={theme.colors.textSecondary}
              value={newTodo}
              onChangeText={setNewTodo}
              onSubmitEditing={handleAddTodo}
              returnKeyType="done"
            />
          </View>

          {/* Todo List with Real Drag & Drop */}
          {sortedTodos.length > 0 ? (
            <View style={styles.todoList}>
              <DraggableFlatList
                data={sortedTodos}
                renderItem={renderTodoItem}
                keyExtractor={(item) => item._id}
                onDragEnd={onDragEnd}
                activationDistance={10}
                autoscrollSpeed={50}
              />
            </View>
          ) : (
            <View style={[styles.todoList, styles.emptyState]}>
              <Text style={styles.emptyStateText}>No todos found</Text>
            </View>
          )}

          {/* Footer */}
          {todos.length > 0 && (
            <View style={styles.footer}>
              <Text style={styles.itemsLeft}>{activeTodos.length} items left</Text>
              
              <View style={styles.filterContainer}>
                {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
                  <TouchableOpacity
                    key={filterType}
                    style={styles.filterButton}
                    onPress={() => setFilter(filterType)}
                  >
                   <Text style={[
                      styles.filterText,
                      filter === filterType && (
                        filterType === 'all' 
                          ? styles.filterTextActive  // Blue for "All"
                          : styles.filterTextActiveWhite // White for "Active" and "Completed"
                      ),
                      filter === filterType && styles.filterTextBold
                    ]}>
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearCompleted}
              >
                <Text style={styles.clearText}>Clear Completed</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.dragHint}>
            {Platform.OS === 'web' 
              ? 'Drag and drop to reorder list' 
              : 'Long press and drag to reorder todos'
            }
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};