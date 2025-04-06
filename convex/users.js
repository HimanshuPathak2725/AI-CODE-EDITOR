import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.string(),
    authId: v.string(),
    plan: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { name, email, authId, plan } = args;
    
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_authId", q => q.eq("authId", authId))
      .first();
      
    if (existingUser) {
      return existingUser._id;
    }
    
    // Create new user
    return await ctx.db.insert("users", {
      name,
      email,
      authId,
      plan: plan || "free",
      createdAt: Date.now(),
    });
  },
});

export const getUser = query({
  args: { authId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_authId", q => q.eq("authId", args.authId))
      .first();
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    plan: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});
