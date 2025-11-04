import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet 
} from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useTheme } from '../theme/ThemeContext';

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const createTodo = useMutation(api.todo.create);
  const { colors } = useTheme();

  const handleSubmit = async () => {
    if (title.trim()) {
      await createTodo({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            color: colors.textPrimary,
            borderColor: colors.border,
          }
        ]}
        placeholder="Add a new task..."
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[
          styles.input, 
          styles.descriptionInput,
          {
            backgroundColor: colors.inputBackground,
            color: colors.textPrimary,
            borderColor: colors.border,
          }
        ]}
        placeholder="Add description (optional)"
        placeholderTextColor={colors.textSecondary}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity 
        style={[
          styles.addButton, 
          { backgroundColor: colors.primary },
          !title.trim() && styles.disabled
        ]} 
        onPress={handleSubmit}
        disabled={!title.trim()}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  descriptionInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  addButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});