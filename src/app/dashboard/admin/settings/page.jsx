"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ImageIcon,
  Layers,
  LayoutDashboard,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useState } from "react";
import CategoriesActionPage from "./(tabs)/CategoriesActionPage";
import FeaturedProductsActionPage from "./(tabs)/FeaturedProductsActionPage";
import SlidersActionPage from "./(tabs)/SlidersActionPage";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("sliders");
  const [sliderDialogOpen, setSliderDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleSave = (type) => {
    switch (type) {
      case "slider":
        setSliderDialogOpen(false);
        break;
      case "product":
        setProductDialogOpen(false);
        break;
      case "feedback":
        setFeedbackDialogOpen(false);
        break;
      case "category":
        setCategoryDialogOpen(false);
        break;
    }
    setCurrentItem(null);
    setEditMode(false);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              System Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your landing page content and appearance
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <div className="w-full overflow-x-auto hide-scrollbar">
            <TabsList className="w-full flex flex-nowrap min-w-max justify-start border-b bg-transparent p-0">
              <TabsTrigger
                value="sliders"
                className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
              >
                <LayoutDashboard className="h-4 w-4 mr-2" /> Sliders
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
              >
                <ShoppingBag className="h-4 w-4 mr-2" /> Featured Products
              </TabsTrigger>

              <TabsTrigger
                value="categories"
                className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
              >
                <Layers className="h-4 w-4 mr-2" /> Categories
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="sliders" className="mt-6">
            <SlidersActionPage />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <FeaturedProductsActionPage />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <CategoriesActionPage />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={sliderDialogOpen} onOpenChange={setSliderDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Slider" : "Add New Slider"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? "Update the details of this slider"
                : "Add a new slider to your landing page"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="slider-title">Title</Label>
              <Input
                id="slider-title"
                defaultValue={currentItem?.title || ""}
                placeholder="Enter slider title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slider-description">Description</Label>
              <Textarea
                id="slider-description"
                defaultValue={currentItem?.description || ""}
                placeholder="Enter slider description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slider-image">Image</Label>
              <div className="flex items-center gap-4">
                {currentItem?.image && (
                  <div className="h-20 w-32 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src={currentItem.image || "/placeholder.svg"}
                      alt="Slider preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <Button variant="outline" className="h-20 w-32">
                  <div className="flex flex-col items-center gap-1">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-xs">Upload Image</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSliderDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSave("slider")}>
              {editMode ? "Update" : "Add"} Slider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? "Update product details"
                : "Add a product to feature on your landing page"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                defaultValue={currentItem?.name || ""}
                placeholder="Enter product name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  defaultValue={currentItem?.price || ""}
                  placeholder="Enter price"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-category">Category</Label>
                <Input
                  id="product-category"
                  defaultValue={currentItem?.category || ""}
                  placeholder="Enter category"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-image">Image</Label>
              <div className="flex items-center gap-4">
                {currentItem?.image && (
                  <div className="h-20 w-32 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src={currentItem.image || "/placeholder.svg"}
                      alt="Product preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <Button variant="outline" className="h-20 w-32">
                  <div className="flex flex-col items-center gap-1">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-xs">Upload Image</span>
                  </div>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="product-featured"
                defaultChecked={currentItem?.featured || false}
              />
              <Label htmlFor="product-featured">Feature on landing page</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setProductDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSave("product")}>
              {editMode ? "Update" : "Add"} Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Feedback" : "Add Feedback"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? "Update customer feedback details"
                : "Add customer feedback to your landing page"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="feedback-name">Customer Name</Label>
              <Input
                id="feedback-name"
                defaultValue={currentItem?.name || ""}
                placeholder="Enter customer name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feedback-rating">Rating</Label>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="icon"
                    className={`h-8 w-8 ${
                      (currentItem?.rating || 0) > i
                        ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                        : ""
                    }`}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        (currentItem?.rating || 0) > i
                          ? "fill-yellow-500 text-yellow-500"
                          : ""
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feedback-comment">Comment</Label>
              <Textarea
                id="feedback-comment"
                defaultValue={currentItem?.comment || ""}
                placeholder="Enter customer comment"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="feedback-date">Date</Label>
                <Input
                  id="feedback-date"
                  type="date"
                  defaultValue={currentItem?.date || ""}
                />
              </div>
              <div className="flex items-center space-x-2 self-end">
                <Switch
                  id="feedback-show"
                  defaultChecked={currentItem?.showOnLanding || false}
                />
                <Label htmlFor="feedback-show">Show on landing page</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFeedbackDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSave("feedback")}>
              {editMode ? "Update" : "Add"} Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? "Update category details"
                : "Add a new product category to your platform"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                defaultValue={currentItem?.name || ""}
                placeholder="Enter category name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-description">Description</Label>
              <Textarea
                id="category-description"
                defaultValue={currentItem?.description || ""}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category-products">Product Count</Label>
                <Input
                  id="category-products"
                  type="number"
                  defaultValue={currentItem?.productCount || 0}
                  disabled={editMode}
                />
                {editMode && (
                  <p className="text-xs text-muted-foreground">
                    Product count is automatically calculated
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 self-end">
                <Switch
                  id="category-featured"
                  defaultChecked={currentItem?.featured || false}
                />
                <Label htmlFor="category-featured">
                  Feature on landing page
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCategoryDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSave("category")}>
              {editMode ? "Update" : "Add"} Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
