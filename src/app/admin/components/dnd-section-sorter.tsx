'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SectionItem {
  id: string;
  label: string;
}

interface SortableItemProps {
  item: SectionItem;
}

function SortableItem({ item }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="touch-none">
      <Card className="p-2 flex items-center gap-2">
        <Button variant="ghost" size="icon" {...listeners} {...attributes} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
        </Button>
        <span className="font-medium">{item.label}</span>
      </Card>
    </div>
  );
}

interface DndSectionSorterProps {
  items: SectionItem[];
  onOrderChange: (newOrder: string[]) => void;
}

export function DndSectionSorter({ items, onOrderChange }: DndSectionSorterProps) {
  const [activeItems, setActiveItems] = useState(items);

  React.useEffect(() => {
    // Sync with external changes
    setActiveItems(items);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = activeItems.findIndex((item) => item.id === active.id);
      const newIndex = activeItems.findIndex((item) => item.id === over!.id);
      const newSortedItems = arrayMove(activeItems, oldIndex, newIndex);
      
      setActiveItems(newSortedItems);
      onOrderChange(newSortedItems.map(item => item.id));
    }
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Section Order</CardTitle>
            <CardDescription>Drag and drop to reorder the sections on the page.</CardDescription>
        </CardHeader>
        <CardContent>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={activeItems} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                    {activeItems.map(item => <SortableItem key={item.id} item={item} />)}
                    </div>
                </SortableContext>
            </DndContext>
        </CardContent>
    </Card>
  );
}

    