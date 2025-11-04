// convex/todo.ts
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db.query('todos').order('desc').collect();
  },
});

export const addTodo = mutation({
  args: { 
    title: v.string(), 
    isCompleted: v.boolean(),
    createdAt: v.number() 
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('todos', args);
  },
});

export const updateTodo = mutation({
  args: { 
    id: v.id('todos'), 
    isCompleted: v.boolean() 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isCompleted: args.isCompleted });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});