// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    title: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
  })
  .index("by_created", ["createdAt"])
  .index("by_completed", ["isCompleted"]),
});