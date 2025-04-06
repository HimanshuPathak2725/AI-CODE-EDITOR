import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";

export const recordExecution = mutation({
  args: {
    code: v.string(),
    language: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    userId: v.optional(v.string()),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { code, language, output, error, userId, duration } = args;
    
    return await ctx.db.insert("codeExecutions", {
      code,
      language,
      output,
      error,
      userId,
      duration,
      createdAt: Date.now(),
    });
  },
});

export const getExecutions = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const { userId } = args;
    
    if (!userId) return [];
    
    return await ctx.db
      .query("codeExecutions")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .order("desc")
      .limit(50)
      .collect();
  },
});

export const execute = action({
  args: {
    code: v.string(),
    language: v.string(),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { code, language, userId } = args;
    const startTime = Date.now();
    
    try {
      // API endpoint for code execution
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          version: "0",
          files: [
            {
              content: code,
            },
          ],
        }),
      });
      
      const data = await response.json();
      const duration = Date.now() - startTime;
      
      let output = null;
      let error = null;
      
      if (data.run.stderr) {
        error = data.run.stderr;
      } else {
        output = data.run.stdout;
      }
      
      // Record the execution
      await ctx.runMutation(async ({ db }) => {
        await db.insert("codeExecutions", {
          code,
          language,
          output,
          error,
          userId,
          duration,
          createdAt: Date.now(),
        });
      });
      
      return { output, error, duration };
    } catch (error) {
      const errorMessage = error.message || "Error executing code";
      const duration = Date.now() - startTime;
      
      // Record the failed execution
      await ctx.runMutation(async ({ db }) => {
        await db.insert("codeExecutions", {
          code,
          language,
          output: null,
          error: errorMessage,
          userId,
          duration,
          createdAt: Date.now(),
        });
      });
      
      return { output: null, error: errorMessage, duration };
    }
  },
});
