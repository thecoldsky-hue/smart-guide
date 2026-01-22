import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useItems, useCreateItem } from "@/hooks/use-items";
import { ItemCard } from "@/components/ItemCard";
import { Plus, Loader2 } from "lucide-react";
import { api } from "@shared/routes";

export default function Demo() {
  const { data: items, isLoading, error } = useItems();
  const createItem = useCreateItem();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // We know the schema expects { name: string, completed?: boolean }
    // Using api.items.create.input.parse handles validation if we wanted to be strict
    createItem.mutate({ name: inputValue }, {
      onSuccess: () => setInputValue("")
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12 animate-in">
            <h1 className="text-4xl font-display font-medium text-primary mb-4">Task Manager</h1>
            <p className="text-muted-foreground">
              A fully functional CRUD example connected to a PostgreSQL database.
            </p>
          </header>

          <div className="space-y-8 animate-in animate-delay-100">
            {/* Input Area */}
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-6 py-5 bg-white rounded-xl border border-border/40 text-lg placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 shadow-sm"
                disabled={createItem.isPending}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || createItem.isPending}
                className="absolute right-3 top-3 bottom-3 aspect-square bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {createItem.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            </form>

            {/* List Area */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-white/50 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : error ? (
                <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl">
                  Failed to load items. Please try again.
                </div>
              ) : items?.length === 0 ? (
                <div className="text-center py-20 bg-white/50 border border-dashed border-border rounded-xl">
                  <p className="text-muted-foreground text-lg">No items yet. Add one above!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {items?.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
            
            <div className="pt-8 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground">
                Data is persisted to the database. Refreshing the page will keep your items.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
