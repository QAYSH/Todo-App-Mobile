// src/types/todo.ts
export interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
  createdAt: number;
  _creationTime: number;
}

export type FilterType = 'all' | 'active' | 'completed';