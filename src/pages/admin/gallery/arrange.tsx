import * as React from 'react';
import { useState, useEffect } from 'react';
// @ts-ignore TS Language Server has intermittent issue resolving this, but it works at runtime
import { DragDropContext, Droppable, Draggable, type DroppableProvided, type DraggableProvided } from '@hello-pangea/dnd';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { saveGalleryConfig, loadMainGalleryConfig } from '@/utils/galleryConfigUtils';
import X from "lucide-react/dist/esm/icons/x"; // Direct import for X icon

const AdminGalleryArrangePage = () => { // Renamed component
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      setLoading(true);
      try {
        const config = await loadMainGalleryConfig();
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

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setSaved(false);
    toast({
      title: "Image removed",
      description: "The image has been removed from the list. Don't forget to save your changes.",
      variant: "default",
    });
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getImageName = (path: string) => {
    return path.split('/').pop()?.split('.')[0] || path;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6">Arrange Gallery Images</h1> {/* Updated Title */}
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Arrange Gallery Images</h1> {/* Updated Title */}
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
          onClick={() => window.location.href = "/"} // Consider navigating to a main admin page if one exists
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
                        <div 
                          className="h-20 w-20 flex-shrink-0 mr-4 overflow-hidden rounded-md cursor-pointer"
                          onClick={() => handleImageClick(image)}
                        >
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
                        <div className="text-muted-foreground text-sm mr-4">
                          Position: {index + 1}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(index);
                          }}
                          className="text-destructive hover:bg-destructive/10"
                          aria-label="Delete image"
                        >
                          <X className="h-4 w-4" />
                        </Button>
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

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeModal}
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 z-10"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </Button>
            <img 
              src={selectedImage} 
              alt="Full size preview" 
              className="max-h-[90vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGalleryArrangePage; // Renamed component export 