import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Items API
  app.get(api.items.list.path, async (req, res) => {
    const items = await storage.getItems();
    res.json(items);
  });

  app.post(api.items.create.path, async (req, res) => {
    try {
      const input = api.items.create.input.parse(req.body);
      const item = await storage.createItem(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.patch(api.items.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = api.items.update.input.parse(req.body);
      const item = await storage.updateItem(id, input);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.items.delete.path, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteItem(id);
    res.status(204).send();
  });

  return httpServer;
}

// Seed function to be called on startup
async function seedDatabase() {
  const existingItems = await storage.getItems();
  if (existingItems.length === 0) {
    await storage.createItem({ name: "Welcome to your new app!", completed: false });
    await storage.createItem({ name: "Try adding a new item", completed: false });
    await storage.createItem({ name: "Mark this item as done", completed: true });
    console.log("Database seeded with initial items");
  }
}

// Call seed (in a real app, might want to check env var or similar)
seedDatabase().catch(console.error);
