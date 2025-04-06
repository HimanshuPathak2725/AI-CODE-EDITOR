import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { id: v.id("snippets") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByUser = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const { userId } = args;
    if (!userId) return [];
    
    return await ctx.db
      .query("snippets")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getPublic = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("snippets")
      .filter(q => q.eq(q.field("isPublic"), true))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    code: v.string(),
    language: v.string(),
    userId: v.optional(v.string()),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { title, code, language, userId, isPublic } = args;
    const now = Date.now();
    
    return await ctx.db.insert("snippets", {
      title,
      code,
      language,
      userId,
      isPublic,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("snippets"),
    title: v.optional(v.string()),
    code: v.optional(v.string()),
    language: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const snippet = await ctx.db.get(id);
    
    if (!snippet) {
      throw new Error("Snippet not found");
    }
    
    return await ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("snippets") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
