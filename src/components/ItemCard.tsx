import { type ItemResponse } from "@shared/routes";
import { useUpdateItem, useDeleteItem } from "@/hooks/use-items";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: ItemResponse;
}

export function ItemCard({ item }: ItemCardProps) {
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();

  return (
    <div className={cn(
      "group relative p-6 bg-white rounded-xl transition-all duration-300",
      "border border-border/40 hover:border-border hover:shadow-lg hover:shadow-black/[0.02]",
      item.completed && "bg-muted/30"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className={cn(
            "text-lg font-medium transition-all duration-300",
            item.completed ? "text-muted-foreground line-through decoration-border" : "text-primary"
          )}>
            {item.name}
          </p>
          <span className="text-xs text-muted-foreground mt-1 block">
            {new Date(item.createdAt || Date.now()).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => updateItem.mutate({ id: item.id, completed: !item.completed })}
            disabled={updateItem.isPending}
            className={cn(
              "h-9 w-9 flex items-center justify-center rounded-lg transition-colors",
              item.completed 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
            )}
            aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
          >
            <Check className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => deleteItem.mutate(item.id)}
            disabled={deleteItem.isPending}
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            aria-label="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Decorative indicator */}
      <div className={cn(
        "absolute left-0 top-6 bottom-6 w-1 rounded-r-full transition-colors duration-300",
        item.completed ? "bg-muted" : "bg-primary"
      )} />
    </div>
  );
}
