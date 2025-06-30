// convex/generations.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createGeneration = mutation({
  args: {
    userId: v.string(),
    inputText: v.string(),
    generationType: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("generations", {
      userId: args.userId,
      inputText: args.inputText,
      generationType: args.generationType,
    });
  },
});
