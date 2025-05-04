"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  ImageIcon,
  LayoutDashboard,
  Layers,
  MessageSquare,
  Plus,
  Save,
  ShoppingBag,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("sliders");
  const [sliderDialogOpen, setSliderDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const sliders = [
    {
      id: 1,
      title: "Summer Collection 2023",
      description: "Discover our latest summer styles with up to 40% off",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our newest products fresh from the designers",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Limited Edition Items",
      description: "Exclusive products available for a limited time only",
      image: "/placeholder.svg",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: "$29.99",
      category: "Clothing",
      featured: true,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: "$89.99",
      category: "Electronics",
      featured: true,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Leather Wallet",
      price: "$49.99",
      category: "Accessories",
      featured: false,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: "$199.99",
      category: "Electronics",
      featured: false,
      image: "/placeholder.svg",
    },
  ];

  const feedbacks = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment:
        "Excellent service and high-quality products. Will definitely shop again!",
      showOnLanding: true,
      date: "2023-04-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment:
        "Fast shipping and good customer service. Very satisfied with my purchase.",
      showOnLanding: true,
      date: "2023-04-10",
    },
    {
      id: 3,
      name: "Robert Johnson",
      rating: 5,
      comment: "The product exceeded my expectations. Highly recommended!",
      showOnLanding: false,
      date: "2023-04-05",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Gadgets, devices, and tech accessories",
      productCount: 120,
      featured: true,
    },
    {
      id: 2,
      name: "Clothing",
      description: "Apparel for men, women, and children",
      productCount: 250,
      featured: true,
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Furniture, appliances, and home decor",
      productCount: 180,
      featured: false,
    },
    {
      id: 4,
      name: "Beauty & Personal Care",
      description: "Cosmetics, skincare, and personal hygiene products",
      productCount: 150,
      featured: false,
    },
  ];

  const handleAddEdit = (type, item = null) => {
    setEditMode(!!item);
    setCurrentItem(item);

    switch (type) {
      case "slider":
        setSliderDialogOpen(true);
        break;
      case "product":
        setProductDialogOpen(true);
        break;
      case "feedback":
        setFeedbackDialogOpen(true);
        break;
      case "category":
        setCategoryDialogOpen(true);
        break;
    }
  };

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

  const toggleFeature = (type, id) => {
    console.log(`Toggle ${type} with id ${id}`);
  };

  const handleDelete = (type, id) => {
    console.log(`Delete ${type} with id ${id}`);
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
          <Button>
            <Save className="h-4 w-4 mr-2" /> Save All Changes
          </Button>
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
                value="feedback"
                className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Feedback
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
            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="show"
            >
              <Card>
                <CardHeader className="flex flex-row gap-4 flex-wrap items-center justify-between">
                  <div>
                    <CardTitle>Slider Management</CardTitle>
                    <CardDescription>
                      Manage hero sliders that appear on your landing page
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleAddEdit("slider")}>
                    <Plus className="h-4 w-4 mr-2" /> Add Slider
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Description
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sliders.map((slider) => (
                        <motion.tr
                          key={slider.id}
                          variants={itemAnimation}
                          className="group"
                        >
                          <TableCell>
                            <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                              <img
                                src={slider.image || "/placeholder.svg"}
                                alt={slider.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {slider.title}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {slider.description.length > 60
                              ? `${slider.description.substring(0, 60)}...`
                              : slider.description}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleAddEdit("slider", slider)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDelete("slider", slider.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="show"
            >
              <Card>
                <CardHeader className="flex gap-4 flex-wrap  flex-row items-center justify-between">
                  <div>
                    <CardTitle>Featured Products</CardTitle>
                    <CardDescription>
                      Manage which products are featured on your landing page
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleAddEdit("product")}>
                    <Plus className="h-4 w-4 mr-2" /> Add Product
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Category
                        </TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <motion.tr
                          key={product.id}
                          variants={itemAnimation}
                          className="group"
                        >
                          <TableCell>
                            <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.category}
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={product.featured}
                              onCheckedChange={() =>
                                toggleFeature("product", product.id)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleAddEdit("product", product)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDelete("product", product.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="feedback" className="mt-6">
            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="show"
            >
              <Card>
                <CardHeader className="flex gap-4 flex-wrap flex-row items-center justify-between">
                  <div>
                    <CardTitle>Customer Feedback</CardTitle>
                    <CardDescription>
                      Manage testimonials displayed on your landing page
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleAddEdit("feedback")}>
                    <Plus className="h-4 w-4 mr-2" /> Add Feedback
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Comment
                        </TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Show</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feedbacks.map((feedback) => (
                        <motion.tr
                          key={feedback.id}
                          variants={itemAnimation}
                          className="group"
                        >
                          <TableCell className="font-medium">
                            {feedback.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < feedback.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {feedback.comment.length > 40
                              ? `${feedback.comment.substring(0, 40)}...`
                              : feedback.comment}
                          </TableCell>
                          <TableCell>{feedback.date}</TableCell>
                          <TableCell>
                            <Switch
                              checked={feedback.showOnLanding}
                              onCheckedChange={() =>
                                toggleFeature("feedback", feedback.id)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleAddEdit("feedback", feedback)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDelete("feedback", feedback.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="show"
            >
              <Card>
                <CardHeader className="flex gap-4 flex-wrap flex-row items-center justify-between">
                  <div>
                    <CardTitle>Category Management</CardTitle>
                    <CardDescription>
                      Manage product categories for your e-commerce platform
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleAddEdit("category")}>
                    <Plus className="h-4 w-4 mr-2" /> Add Category
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Description
                        </TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <motion.tr
                          key={category.id}
                          variants={itemAnimation}
                          className="group"
                        >
                          <TableCell className="font-medium">
                            {category.name}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {category.description.length > 40
                              ? `${category.description.substring(0, 40)}...`
                              : category.description}
                          </TableCell>
                          <TableCell>{category.productCount}</TableCell>
                          <TableCell>
                            <Switch
                              checked={category.featured}
                              onCheckedChange={() =>
                                toggleFeature("category", category.id)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleAddEdit("category", category)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDelete("category", category.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
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

      {/* Product Dialog */}
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

      {/* Feedback Dialog */}
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

      {/* Category Dialog */}
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
