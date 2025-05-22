/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DroppableProvided, DraggableProvided, DropResult } from '@hello-pangea/dnd';
import { Button, Label, Input, Dialog, DialogContent, DialogHeader, DialogTitle, useToast, Checkbox } from "@/components/ui";
import { X, Edit } from "lucide-react";
import { saveGalleryConfig, loadMainGalleryConfig, renameGalleryImage } from '@/utils/galleryConfigUtils';

interface RenameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onRename: (oldPath: string, newPath: string) => Promise<void>;
  onRemove: (imagePath: string) => void;
}

const RenameDialog: React.FC<RenameDialogProps> = ({ isOpen, onClose, currentImage, onRename, onRemove }) => {
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
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} className="space-y-4">
          <div>
            <Label>New Filename</Label>
            <Input
              id="filename"
              value={newFilename}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFilename(e.target.value)}
              placeholder="Enter new filename"
              disabled={isProcessing}
            />
          </div>
          <div className="flex justify-between items-center space-x-2">
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onRemove(currentImage);
                onClose();
              }}
              disabled={isProcessing}
            >
              Remove from List
            </Button>
            <div className="flex space-x-2">
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface MasonryItem {
  src: string;
  index: number;
  style: React.CSSProperties;
}

const ArrangePage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [renameDialogImage, setRenameDialogImage] = useState<string | null>(null);
  const [masonryItems, setMasonryItems] = useState<MasonryItem[]>([]);
  const [imageDimensionsMap, setImageDimensionsMap] = useState<Record<string, { width: number; height: number }>>({});
  const galleryRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [allAvailableImages, setAllAvailableImages] = useState<string[]>([]);
  const [selectedToAdd, setSelectedToAdd] = useState<string[]>([]);
  const [loadingAvailable, setLoadingAvailable] = useState(false);

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

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>, src: string) => {
    const img = e.currentTarget;
    setImageDimensionsMap((prev) => ({ ...prev, [src]: { width: img.naturalWidth, height: img.naturalHeight } }));
  };

  useEffect(() => {
    const calculateMasonryLayout = () => {
      if (!galleryRef.current || images.length === 0) {
        setMasonryItems([]);
        if (galleryRef.current) galleryRef.current.style.height = "auto";
        return;
      }

      const galleryWidth = galleryRef.current.offsetWidth;
      const gap = 8;
      let numColumns = 3;
      if (galleryWidth < 640) numColumns = 1;
      else if (galleryWidth < 1024) numColumns = 2;
      else numColumns = 3;

      const columnWidth = (galleryWidth - (numColumns - 1) * gap) / numColumns;
      const columnHeights = Array(numColumns).fill(0);

      const items: MasonryItem[] = images.map((src, index) => {
        const dimensions = imageDimensionsMap[src];
        const aspectRatio = dimensions ? dimensions.width / dimensions.height : 1;
        const safeAspectRatio = aspectRatio && isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : 1;
        const imageHeight = columnWidth / safeAspectRatio;

        let shortestColumnIndex = 0;
        for (let i = 1; i < numColumns; i++) {
          if (columnHeights[i] < columnHeights[shortestColumnIndex]) {
            shortestColumnIndex = i;
          }
        }

        const x = shortestColumnIndex * (columnWidth + gap);
        const y = columnHeights[shortestColumnIndex];
        columnHeights[shortestColumnIndex] += imageHeight + gap;

        return {
          src,
          index,
          style: {
            position: "absolute",
            left: x,
            top: y,
            width: columnWidth,
            height: imageHeight,
          },
        };
      });

      setMasonryItems(items);
      if (galleryRef.current) {
        const newHeight = Math.max(...columnHeights);
        galleryRef.current.style.height = newHeight > 0 ? `${newHeight}px` : "auto";
      }
    };

    calculateMasonryLayout();
    window.addEventListener("resize", calculateMasonryLayout);
    return () => window.removeEventListener("resize", calculateMasonryLayout);
  }, [images, imageDimensionsMap]);

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

  const handleRemove = async (imagePath: string) => {
    const newImages = images.filter((img) => img !== imagePath);
    setImages(newImages);
    try {
      await saveGalleryConfig(newImages);
      toast({
        title: "Removed",
        description: "Image removed from the gallery list.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update gallery list.",
        variant: "destructive",
      });
      loadImages();
    }
  };

  const openAddDialog = async () => {
    setLoadingAvailable(true);
    setAddDialogOpen(true);
    try {
      const res = await fetch('/api/list-gallery-images');
      if (res.ok) {
        const allImages: string[] = await res.json();
        // Only show images not already in the gallery
        setAllAvailableImages(allImages.filter(img => !images.includes(img)));
      } else {
        setAllAvailableImages([]);
      }
    } catch {
      setAllAvailableImages([]);
    } finally {
      setLoadingAvailable(false);
      setSelectedToAdd([]);
    }
  };

  const handleAddSelected = async () => {
    if (selectedToAdd.length === 0) return;
    const newImages = [...images, ...selectedToAdd];
    setImages(newImages);
    setAddDialogOpen(false);
    setSelectedToAdd([]);
    try {
      await saveGalleryConfig(newImages);
      toast({ title: "Images added", description: `${selectedToAdd.length} image(s) added to the gallery.` });
    } catch {
      toast({ title: "Error", description: "Failed to save new images.", variant: "destructive" });
      loadImages();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Arrange Gallery Images</h1>
        <Button onClick={openAddDialog} variant="default">Add more images</Button>
      </div>
      <Dialog open={addDialogOpen} onOpenChange={(open: boolean) => setAddDialogOpen(open)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Images to Gallery</DialogTitle>
          </DialogHeader>
          {loadingAvailable ? (
            <div>Loading images...</div>
          ) : allAvailableImages.length === 0 ? (
            <div>No available images to add.</div>
          ) : (
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); handleAddSelected(); }}>
              <div className="max-h-96 overflow-y-auto grid grid-cols-2 gap-2 mb-4">
                {allAvailableImages.map(img => (
                  <label key={img} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={selectedToAdd.includes(img)}
                      onCheckedChange={(checked: boolean) => {
                        setSelectedToAdd(prev => checked ? [...prev, img] : prev.filter(i => i !== img));
                      }}
                    />
                    <img src={img} alt={img} className="w-20 h-16 object-cover rounded border" />
                    <span className="truncate text-xs">{img.split('/').pop()}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={selectedToAdd.length === 0}>Add Selected</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <p className="text-gray-600 mb-8">
        Drag and drop images to reorder them. Click an image to preview it.
        The order shown here will be reflected in the gallery on the website.
      </p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery">
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={(el) => {
                provided.innerRef(el);
                // @ts-ignore - we need both refs
                galleryRef.current = el;
              }}
              className="relative w-full max-w-6xl mx-auto"
            >
              {masonryItems.map((item) => (
                <Draggable draggableId={item.src} index={item.index} key={item.src}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...item.style,
                        ...provided.draggableProps.style,
                      }}
                      className="rounded-md overflow-hidden cursor-move group"
                    >
                      <div className="relative w-full h-full bg-gray-700">
                        <img
                          src={item.src}
                          alt={`Gallery image ${item.index + 1}`}
                          className="w-full h-full object-cover hover:brightness-105 transition-all delay-200"
                          onClick={() => setSelectedImage(item.src)}
                          onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => handleImageLoad(e, item.src)}
                        />
                        <button
                          onClick={() => setRenameDialogImage(item.src)}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={!!selectedImage} onOpenChange={(open: boolean) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Preview Image</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <img
              src={selectedImage || ''}
              alt="Selected gallery image"
              className="w-full h-auto"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
            >
              <X size={16} />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <RenameDialog
        isOpen={!!renameDialogImage}
        onClose={() => setRenameDialogImage(null)}
        currentImage={renameDialogImage || ''}
        onRename={handleRename}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default ArrangePage; 