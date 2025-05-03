"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CreditCard,
  Database,
  HardDrive,
  MoreHorizontal,
  Plus,
  Save,
  Server,
  SettingsIcon,
  Truck,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              System Settings
            </h1>
            <p className="text-muted-foreground">
              Configure platform-wide settings and preferences.
            </p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Information</CardTitle>
                    <CardDescription>
                      Basic information about your platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform-name">Platform Name</Label>
                      <Input id="platform-name" defaultValue="MarketHub" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform-url">Platform URL</Label>
                      <Input
                        id="platform-url"
                        defaultValue="https://markethub.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform-description">
                        Platform Description
                      </Label>
                      <Textarea
                        id="platform-description"
                        defaultValue="MarketHub is a multi-vendor marketplace connecting buyers and sellers worldwide."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="support-email">Support Email</Label>
                      <Input
                        id="support-email"
                        defaultValue="support@markethub.com"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Settings</CardTitle>
                    <CardDescription>
                      Configure region-specific settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">
                            UTC (Coordinated Universal Time)
                          </SelectItem>
                          <SelectItem value="est">
                            EST (Eastern Standard Time)
                          </SelectItem>
                          <SelectItem value="cst">
                            CST (Central Standard Time)
                          </SelectItem>
                          <SelectItem value="pst">
                            PST (Pacific Standard Time)
                          </SelectItem>
                          <SelectItem value="gmt">
                            GMT (Greenwich Mean Time)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="mdy">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="jpy">JPY (¥)</SelectItem>
                          <SelectItem value="cad">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>User Registration</CardTitle>
                    <CardDescription>
                      Configure user registration settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-registration">
                          Allow User Registration
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable or disable new user registrations
                        </p>
                      </div>
                      <Switch id="allow-registration" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-verification">
                          Email Verification
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Require email verification for new accounts
                        </p>
                      </div>
                      <Switch id="email-verification" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-social-login">
                          Allow Social Login
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable login with social media accounts
                        </p>
                      </div>
                      <Switch id="allow-social-login" defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="default-user-role">
                        Default User Role
                      </Label>
                      <Select defaultValue="customer">
                        <SelectTrigger id="default-user-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="seller">Seller</SelectItem>
                          <SelectItem value="affiliate">Affiliate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Seller Settings</CardTitle>
                    <CardDescription>
                      Configure seller-related settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="seller-applications">
                          Allow Seller Applications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable or disable new seller applications
                        </p>
                      </div>
                      <Switch id="seller-applications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="seller-verification">
                          Require Seller Verification
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Verify seller identity before approval
                        </p>
                      </div>
                      <Switch id="seller-verification" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-approve-products">
                          Auto-Approve Products
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically approve new product listings
                        </p>
                      </div>
                      <Switch id="auto-approve-products" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commission-rate">
                        Default Commission Rate (%)
                      </Label>
                      <Input
                        id="commission-rate"
                        type="number"
                        defaultValue="10"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <RadioGroup defaultValue="system" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="theme-system" />
                        <Label htmlFor="theme-system">System</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        defaultValue="#0070f3"
                        className="w-16 h-10"
                      />
                      <Input defaultValue="#0070f3" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-upload">Platform Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                        <SettingsIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" /> Upload Logo
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favicon-upload">Favicon</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                        <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" /> Upload Favicon
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Layout Settings</CardTitle>
                  <CardDescription>
                    Configure the layout of your platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="homepage-layout">Homepage Layout</Label>
                    <Select defaultValue="featured">
                      <SelectTrigger id="homepage-layout">
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">
                          Featured Products
                        </SelectItem>
                        <SelectItem value="categories">
                          Categories Grid
                        </SelectItem>
                        <SelectItem value="banner">Banner Slider</SelectItem>
                        <SelectItem value="custom">Custom Layout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-display">Product Display</Label>
                    <Select defaultValue="grid">
                      <SelectTrigger id="product-display">
                        <SelectValue placeholder="Select display" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                        <SelectItem value="compact">Compact View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-breadcrumbs">Show Breadcrumbs</Label>
                      <p className="text-sm text-muted-foreground">
                        Display navigation breadcrumbs
                      </p>
                    </div>
                    <Switch id="show-breadcrumbs" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sticky-header">Sticky Header</Label>
                      <p className="text-sm text-muted-foreground">
                        Keep header visible when scrolling
                      </p>
                    </div>
                    <Switch id="sticky-header" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system-wide notification settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Email Notifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-new-orders">New Orders</Label>
                          <p className="text-sm text-muted-foreground">
                            Send email when new orders are placed
                          </p>
                        </div>
                        <Switch id="email-new-orders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-new-users">
                            New User Registrations
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Send email when new users register
                          </p>
                        </div>
                        <Switch id="email-new-users" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-product-reviews">
                            Product Reviews
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Send email when products receive reviews
                          </p>
                        </div>
                        <Switch id="email-product-reviews" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      System Notifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-low-stock">
                            Low Stock Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when product stock is low
                          </p>
                        </div>
                        <Switch id="system-low-stock" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-security">
                            Security Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notify about security-related events
                          </p>
                        </div>
                        <Switch id="system-security" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-maintenance">
                            Maintenance Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notify about scheduled maintenance
                          </p>
                        </div>
                        <Switch id="system-maintenance" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-email">
                      Notification Email
                    </Label>
                    <Input
                      id="notification-email"
                      defaultValue="admin@markethub.com"
                    />
                    <p className="text-sm text-muted-foreground">
                      System notifications will be sent to this email
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateways</CardTitle>
                  <CardDescription>
                    Configure payment processing integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Stripe</h4>
                        <p className="text-sm text-muted-foreground">
                          Credit card processing
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Active
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">PayPal</h4>
                        <p className="text-sm text-muted-foreground">
                          PayPal payments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Active
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Square</h4>
                        <p className="text-sm text-muted-foreground">
                          Square payments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-700 border-gray-200"
                      >
                        Inactive
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Add Payment Gateway
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Providers</CardTitle>
                  <CardDescription>
                    Configure shipping and fulfillment integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">UPS</h4>
                        <p className="text-sm text-muted-foreground">
                          UPS shipping services
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Active
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">FedEx</h4>
                        <p className="text-sm text-muted-foreground">
                          FedEx shipping services
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Active
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">USPS</h4>
                        <p className="text-sm text-muted-foreground">
                          USPS shipping services
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-700 border-gray-200"
                      >
                        Inactive
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Add Shipping Provider
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <CardDescription>
                  Configure platform billing and subscription settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Current Plan</h3>
                  <div className="bg-primary/5 rounded-lg p-4 border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">
                          Enterprise Plan
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Unlimited users, products, and features
                        </p>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <Check className="h-4 w-4 mr-1 text-green-500" />
                          <span>Renews on May 15, 2023</span>
                        </div>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        Active
                      </Badge>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        View Invoice
                      </Button>
                      <Button variant="outline" size="sm">
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Payment Method</h3>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Visa ending in 4242</h4>
                        <p className="text-sm text-muted-foreground">
                          Expires 12/2024
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Billing Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billing-name">Name</Label>
                        <Input
                          id="billing-name"
                          defaultValue="MarketHub Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-email">Email</Label>
                        <Input
                          id="billing-email"
                          defaultValue="billing@markethub.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-address">Address</Label>
                      <Input
                        id="billing-address"
                        defaultValue="123 Market Street"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billing-city">City</Label>
                        <Input id="billing-city" defaultValue="San Francisco" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-state">State</Label>
                        <Input id="billing-state" defaultValue="CA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-zip">ZIP</Label>
                        <Input id="billing-zip" defaultValue="94103" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger id="billing-country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Billing Information</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>
                    Configure system maintenance settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Put the platform in maintenance mode
                      </p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">
                      Maintenance Message
                    </Label>
                    <Textarea
                      id="maintenance-message"
                      defaultValue="We're currently performing scheduled maintenance. Please check back soon."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="log-level">Log Level</Label>
                    <Select defaultValue="info">
                      <SelectTrigger id="log-level">
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                    <Input id="cache-ttl" type="number" defaultValue="3600" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <HardDrive className="h-4 w-4 mr-2" /> Clear System Cache
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Settings</CardTitle>
                  <CardDescription>
                    Configure API access and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-api">Enable API Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow external API access
                      </p>
                    </div>
                    <Switch id="enable-api" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-rate-limit">
                      API Rate Limit (requests/minute)
                    </Label>
                    <Input
                      id="api-rate-limit"
                      type="number"
                      defaultValue="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="api-key"
                        defaultValue="sk_live_51KjHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        type="password"
                      />
                      <Button variant="outline" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use this key to authenticate API requests
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="webhook-notifications">
                        Webhook Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Send events to registered webhooks
                      </p>
                    </div>
                    <Switch id="webhook-notifications" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Server className="h-4 w-4 mr-2" /> View API Documentation
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Database Settings</CardTitle>
                  <CardDescription>
                    Configure database and backup settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-host">Database Host</Label>
                      <Input id="db-host" defaultValue="db.markethub.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-port">Database Port</Label>
                      <Input id="db-port" defaultValue="5432" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-name">Database Name</Label>
                      <Input id="db-name" defaultValue="markethub_production" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-user">Database User</Label>
                      <Input id="db-user" defaultValue="markethub_admin" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Schedule regular database backups
                      </p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">
                      Backup Retention (days)
                    </Label>
                    <Input
                      id="backup-retention"
                      type="number"
                      defaultValue="30"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Database className="h-4 w-4 mr-2" /> Create Backup Now
                  </Button>
                  <Button variant="outline">
                    <ArrowRight className="h-4 w-4 mr-2" /> View Backup History
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
