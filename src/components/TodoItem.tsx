import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useTheme } from '../theme/ThemeContext';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const updateTodo = useMutation(api.todo.update);
  const deleteTodo = useMutation(api.todo.remove);
  const { colors } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleToggle = () => {
    updateTodo({ id: todo._id as any, isCompleted: !todo.isCompleted });
  };

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      deleteTodo({ id: todo._id as any });
    });
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          opacity: fadeAnim 
        }
      ]}
    >
      <TouchableOpacity onPress={handleToggle} style={styles.checkbox}>
        <View style={[
          styles.checkboxInner, 
          { borderColor: colors.primary },
          todo.isCompleted && [styles.checked, { backgroundColor: colors.primary }]
        ]}>
          {todo.isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={[
          styles.title, 
          { color: colors.textPrimary },
          todo.isCompleted && [styles.completed, { color: colors.textSecondary }]
        ]}>
          {todo.title}
        </Text>
        {todo.description && (
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {todo.description}
          </Text>
        )}
      </View>
      
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={[styles.deleteText, { color: colors.delete }]}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    // backgroundColor is set dynamically
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});