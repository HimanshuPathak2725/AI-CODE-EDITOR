import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  snippets: defineTable({
    title: v.string(),
    code: v.string(),
    language: v.string(),
    userId: v.optional(v.string()),
    isPublic: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),
  
  codeExecutions: defineTable({
    code: v.string(),
    language: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    userId: v.optional(v.string()),
    duration: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
  
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    authId: v.string(),
    plan: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_authId", ["authId"]),
});
