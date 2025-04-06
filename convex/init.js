import { mutation } from "./_generated/server";

export const initializeDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if we've already initialized
    const existingUsers = await ctx.db.query("users").collect();
    if (existingUsers.length > 0) {
      return { status: "already_initialized" };
    }
    
    // Create sample snippets
    await ctx.db.insert("snippets", {
      title: "Hello World in JavaScript",
      code: `console.log("Hello, CodeCrafter!");`,
      language: "javascript",
      userId: null,
      isPublic: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    await ctx.db.insert("snippets", {
      title: "Fibonacci Sequence in Python",
      code: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print(list(fibonacci(10)))`,
      language: "python",
      userId: null,
      isPublic: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return { status: "initialized" };
  },
});
