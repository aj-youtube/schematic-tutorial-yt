import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  generations: defineTable({
    userId: v.string(),
    inputText: v.string(),
    generationType: v.string(),
  }),
});
