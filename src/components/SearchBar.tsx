import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  const { colors } = useTheme();

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
        placeholder="Search tasks..."
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={onSearchChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
  },
});