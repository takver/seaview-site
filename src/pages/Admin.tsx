import * as React from 'react';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, type DroppableProvided, type DraggableProvided } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { saveGalleryConfig, loadGalleryConfig } from '@/utils/galleryConfigUtils';

const AdminPage = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load the gallery configuration on component mount
    const loadConfig = async () => {
      setLoading(true);
      try {
        const config = await loadGalleryConfig();
        setImages(config);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load gallery configuration:', error);
        toast({
          title: "Error",
          description: "Failed to load gallery configuration",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    loadConfig();
  }, [toast]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setImages(items);
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      await saveGalleryConfig(images);
      setSaved(true);
      toast({
        title: "Success",
        description: "Gallery order has been saved",
      });
    } catch (error) {
      console.error('Failed to save gallery configuration:', error);
      toast({
        title: "Error",
        description: "Failed to save gallery configuration",
        variant: "destructive",
      });
    }
  };

  const getImageName = (path: string) => {
    return path.split('/').pop()?.split('.')[0] || path;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6">Gallery Admin</h1>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Gallery Admin</h1>
      <p className="mb-6 text-muted-foreground">
        Drag and drop images to reorder them in the gallery. The order will be preserved and used in the "Show All Pictures" section.
      </p>
      
      <div className="mb-6 flex gap-4">
        <Button 
          onClick={handleSave} 
          disabled={saved}
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90"
        >
          {saved ? "Saved" : "Save Order"}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = "/"}
          className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-full"
        >
          Back to Home
        </Button>
      </div>

      <div className="border rounded-md">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="gallery-images">
            {(provided: DroppableProvided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-4 space-y-2"
              >
                {images.map((image, index) => (
                  <Draggable key={image} draggableId={image} index={index}>
                    {(provided: DraggableProvided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center p-3 bg-card hover:bg-accent rounded-md border"
                      >
                        <div className="h-16 w-16 flex-shrink-0 mr-4 overflow-hidden rounded-md">
                          <img
                            src={image}
                            alt={getImageName(image)}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium">
                            {getImageName(image)}
                          </span>
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Position: {index + 1}
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default AdminPage; 