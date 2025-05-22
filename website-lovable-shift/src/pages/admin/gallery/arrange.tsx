import * as React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import { DragDropContext, Droppable, Draggable, type DroppableProvided, type DraggableProvided, type DropResult } from '@hello-pangea/dnd';
import { Button, Label, Input, Dialog, DialogContent, DialogHeader, DialogTitle, useToast } from "@/components/ui";
import { saveGalleryConfig, loadMainGalleryConfig, renameGalleryImage } from '@/utils/galleryConfigUtils';
import { X, Edit } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface RenameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onRename: (oldPath: string, newPath: string) => Promise<void>;
}

const RenameDialog: React.FC<RenameDialogProps> = ({ isOpen, onClose, currentImage, onRename }) => {
  const [newFilename, setNewFilename] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Extract the current filename and directory from the path
  const currentFilePath = currentImage || '';
  const lastSlashIndex = currentFilePath.lastIndexOf('/');
  const directory = lastSlashIndex !== -1 ? currentFilePath.substring(0, lastSlashIndex + 1) : '';
  const currentFilename = lastSlashIndex !== -1
    ? currentFilePath.substring(lastSlashIndex + 1).split('.')[0]
    : '';
  const extension = currentFilePath.split('.').pop() || '';

  useEffect(() => {
    if (isOpen && currentFilename) {
      setNewFilename(currentFilename);
    }
  }, [isOpen, currentFilename]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newFilename) {
      toast({
        title: "Error",
        description: "Please enter a new filename",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const newPath = `${directory}${newFilename}.${extension}`;
      await onRename(currentImage, newPath);
      toast({
        title: "Success",
        description: "Image renamed successfully",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to rename image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="filename">New Filename</Label>
            <Input
              id="filename"
              value={newFilename}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewFilename(e.target.value)}
              placeholder="Enter new filename"
              disabled={isProcessing}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
            >
              {isProcessing ? "Renaming..." : "Rename"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </DialogPrimitive.Root>
  );
};

const ArrangePage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [renameDialogImage, setRenameDialogImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const loadedImages = await loadMainGalleryConfig();
      setImages(loadedImages);
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: "Error",
        description: "Failed to load images",
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const newImages = Array.from(images);
    const [reorderedItem] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, reorderedItem);

    setImages(newImages);

    try {
      await saveGalleryConfig(newImages);
      toast({
        title: "Success",
        description: "Gallery order updated successfully",
      });
    } catch (error) {
      console.error('Error saving new order:', error);
      toast({
        title: "Error",
        description: "Failed to save new order",
        variant: "destructive",
      });
      // Revert to previous order
      loadImages();
    }
  };

  const handleRename = async (oldPath: string, newPath: string) => {
    try {
      await renameGalleryImage(oldPath, newPath);
      setImages((prevImages: string[]) => prevImages.map((img: string) => img === oldPath ? newPath : img));
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Arrange Gallery Images</h1>
      <p className="text-gray-600 mb-8">
        Drag and drop images to reorder them. Click an image to preview it.
        The order shown here will be reflected in the gallery on the website.
      </p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery">
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {images.map((image: string, index: number) => (
                <Draggable key={image} draggableId={image} index={index}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative group"
                    >
                      <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-md">
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => setSelectedImage(image)}
                        />
                      </div>
                      <button
                        onClick={() => setRenameDialogImage(image)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {selectedImage && (
        <DialogPrimitive.Root open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected gallery image"
                className="w-full h-auto"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </DialogContent>
        </DialogPrimitive.Root>
      )}

      <RenameDialog
        isOpen={!!renameDialogImage}
        onClose={() => setRenameDialogImage(null)}
        currentImage={renameDialogImage || ''}
        onRename={handleRename}
      />
    </div>
  );
};

export default ArrangePage; 