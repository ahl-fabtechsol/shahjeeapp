"use client";

import { useState } from "react";
import {
  Bell,
  CreditCard,
  Globe,
  Info,
  Key,
  Lock,
  MapPin,
  Plus,
  Save,
  Shield,
  Smartphone,
  Store,
  Truck,
  User,
  UserCog,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and store preferences.
            </p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <TabsList className="flex flex-col items-start justify-start w-full rounded-none border-0 p-0">
                  <TabsTrigger
                    value="account"
                    className="justify-start w-full rounded-none border-b px-4 py-3 font-normal data-[state=active]:bg-muted"
                  >
                    <User className="h-4 w-4 mr-2" /> Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="profile"
                    className="justify-start w-full rounded-none border-b px-4 py-3 font-normal data-[state=active]:bg-muted"
                  >
                    <UserCog className="h-4 w-4 mr-2" /> Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="store"
                    className="justify-start w-full rounded-none border-b px-4 py-3 font-normal data-[state=active]:bg-muted"
                  >
                    <Store className="h-4 w-4 mr-2" /> Store
                  </TabsTrigger>
                  <TabsTrigger
                    value="shipping"
                    className="justify-start w-full rounded-none border-b px-4 py-3 font-normal data-[state=active]:bg-muted"
                  >
                    <Truck className="h-4 w-4 mr-2" /> Shipping
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment"
                    className="justify-start w-full rounded-none border-b px-4 py-3 font-normal data-[state=active]:bg-muted"
                  >
                    <CreditCard className="h-4 w-4 mr-2" /> Payment
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start w-full rounded-none border-b px-4 py-3 font-normal data-[state=active]:bg-muted"
                  >
                    <Bell className="h-4 w-4 mr-2" /> Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="justify-start w-full rounded-none border-b px-4 py-3 font-normal data-[state=active]:bg-muted"
                  >
                    <Shield className="h-4 w-4 mr-2" /> Security
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>

            <TabsContent value="account" className="m-0 md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src="/placeholder.svg?height=64&width=64"
                        alt="Profile"
                      />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium">Profile Picture</h3>
                      <p className="text-sm text-muted-foreground">
                        JPG, GIF or PNG. Max size of 2MB.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Upload
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Smith" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.smith@example.com"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america-new_york">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-new_york">
                          America/New York (EST)
                        </SelectItem>
                        <SelectItem value="america-chicago">
                          America/Chicago (CST)
                        </SelectItem>
                        <SelectItem value="america-denver">
                          America/Denver (MST)
                        </SelectItem>
                        <SelectItem value="america-los_angeles">
                          America/Los Angeles (PST)
                        </SelectItem>
                        <SelectItem value="europe-london">
                          Europe/London (GMT)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="m-0 md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your public profile information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" defaultValue="JohnS" />
                    <p className="text-xs text-muted-foreground">
                      This is the name that will be displayed to your customers.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      defaultValue="Experienced seller specializing in electronics and accessories."
                      className="min-h-[120px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Brief description for your profile.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      defaultValue="https://example.com"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="social-links">Social Media Links</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Select defaultValue="twitter">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          defaultValue="https://twitter.com/johnseller"
                          className="flex-1"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Social Link
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Seller Badge</Label>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Verified Seller
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        Top Rated
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        Premium
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Badges displayed on your profile.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="store" className="m-0 md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Store Settings</CardTitle>
                  <CardDescription>
                    Manage your store information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" defaultValue="TechGadgets" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="store-description">Store Description</Label>
                    <Textarea
                      id="store-description"
                      placeholder="Describe your store"
                      defaultValue="Premium electronics and accessories at competitive prices."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="store-logo">Store Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                        <Store className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-muted-foreground">
                          JPG, GIF or PNG. Max size of 2MB.
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Button variant="outline" size="sm">
                            Upload
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="store-currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="store-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                        <SelectItem value="aud">AUD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="store-address">Store Address</Label>
                    <div className="space-y-2">
                      <Input
                        id="store-address"
                        placeholder="Street Address"
                        defaultValue="123 Commerce St"
                      />
                      <Input placeholder="Apt, Suite, etc. (optional)" />
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="City" defaultValue="New York" />
                        <Input placeholder="State/Province" defaultValue="NY" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="ZIP/Postal Code"
                          defaultValue="10001"
                        />
                        <Select defaultValue="us">
                          <SelectTrigger>
                            <SelectValue placeholder="Country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Store Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="store-active" defaultChecked />
                          <Label
                            htmlFor="store-active"
                            className="cursor-pointer"
                          >
                            Store Active
                          </Label>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Online
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="vacation-mode" />
                        <Label
                          htmlFor="vacation-mode"
                          className="cursor-pointer"
                        >
                          Vacation Mode
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="tax-inclusive" defaultChecked />
                        <Label
                          htmlFor="tax-inclusive"
                          className="cursor-pointer"
                        >
                          Show Tax-Inclusive Prices
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="m-0 md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Settings</CardTitle>
                  <CardDescription>
                    Manage your shipping options and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label>Shipping Methods</Label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Method
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Truck className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Standard Shipping</p>
                              <p className="text-sm text-muted-foreground">
                                3-5 business days
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge>$5.99</Badge>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Truck className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Express Shipping</p>
                              <p className="text-sm text-muted-foreground">
                                1-2 business days
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge>$12.99</Badge>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Truck className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Free Shipping</p>
                              <p className="text-sm text-muted-foreground">
                                Orders over $100
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">Free</Badge>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-2">
                    <Label>Shipping Origin</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <p className="text-sm">
                        123 Commerce St, New York, NY 10001, USA
                      </p>
                      <Button variant="ghost" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Shipping Zones</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <p className="font-medium">
                            Domestic (United States)
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <p className="font-medium">International</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Shipping Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="free-shipping-threshold" defaultChecked />
                        <Label
                          htmlFor="free-shipping-threshold"
                          className="cursor-pointer"
                        >
                          Enable free shipping for orders over
                        </Label>
                        <Input className="w-24" defaultValue="100" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="flat-rate" />
                        <Label htmlFor="flat-rate" className="cursor-pointer">
                          Use flat rate shipping
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="calculated-rates" defaultChecked />
                        <Label
                          htmlFor="calculated-rates"
                          className="cursor-pointer"
                        >
                          Calculate shipping rates based on address
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="m-0 md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>
                    Manage your payment methods and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <Label>Payment Methods</Label>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <RadioGroup defaultValue="stripe">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="stripe" id="stripe" />
                            <Label htmlFor="stripe" className="cursor-pointer">
                              Stripe
                            </Label>
                            <Badge className="ml-auto">Connected</Badge>
                          </div>
                          <div className="mt-4 pl-6">
                            <p className="text-sm text-muted-foreground">
                              Accept credit cards, Apple Pay, Google Pay, and
                              more.
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                            >
                              Configure
                            </Button>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="rounded-md border p-4">
                        <RadioGroup defaultValue="stripe">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="cursor-pointer">
                              PayPal
                            </Label>
                            <Badge variant="outline" className="ml-auto">
                              Not Connected
                            </Badge>
                          </div>
                          <div className="mt-4 pl-6">
                            <p className="text-sm text-muted-foreground">
                              Accept PayPal payments from customers worldwide.
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                            >
                              Connect
                            </Button>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-2">
                    <Label>Payout Information</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Bank Account</p>
                          <p className="text-sm text-muted-foreground">
                            Ending in ****1234 • Chase Bank • Checking
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Tax Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="collect-tax" defaultChecked />
                        <Label htmlFor="collect-tax" className="cursor-pointer">
                          Automatically collect tax
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tax-inclusive-prices" defaultChecked />
                        <Label
                          htmlFor="tax-inclusive-prices"
                          className="cursor-pointer"
                        >
                          Display tax-inclusive prices
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tax-exemptions" />
                        <Label
                          htmlFor="tax-exemptions"
                          className="cursor-pointer"
                        >
                          Enable tax exemptions for eligible customers
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Invoice Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-invoice" defaultChecked />
                        <Label
                          htmlFor="auto-invoice"
                          className="cursor-pointer"
                        >
                          Automatically generate invoices
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="invoice-prefix" defaultChecked />
                        <Label
                          htmlFor="invoice-prefix"
                          className="cursor-pointer"
                        >
                          Use custom invoice prefix
                        </Label>
                        <Input className="w-24" defaultValue="INV-" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="m-0 md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <Label>Email Notifications</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="new-order" defaultChecked />
                          <Label htmlFor="new-order" className="cursor-pointer">
                            New order received
                          </Label>
                        </div>
                        <Select defaultValue="immediately">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediately">
                              Immediately
                            </SelectItem>
                            <SelectItem value="hourly">
                              Hourly digest
                            </SelectItem>
                            <SelectItem value="daily">Daily digest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="order-status" defaultChecked />
                          <Label
                            htmlFor="order-status"
                            className="cursor-pointer"
                          >
                            Order status updates
                          </Label>
                        </div>
                        <Select defaultValue="immediately">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediately">
                              Immediately
                            </SelectItem>
                            <SelectItem value="hourly">
                              Hourly digest
                            </SelectItem>
                            <SelectItem value="daily">Daily digest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="customer-feedback" defaultChecked />
                          <Label
                            htmlFor="customer-feedback"
                            className="cursor-pointer"
                          >
                            Customer feedback and reviews
                          </Label>
                        </div>
                        <Select defaultValue="daily">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediately">
                              Immediately
                            </SelectItem>
                            <SelectItem value="hourly">
                              Hourly digest
                            </SelectItem>
                            <SelectItem value="daily">Daily digest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="inventory-alerts" defaultChecked />
                          <Label
                            htmlFor="inventory-alerts"
                            className="cursor-pointer"
                          >
                            Inventory alerts
                          </Label>
                        </div>
                        <Select defaultValue="immediately">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediately">
                              Immediately
                            </SelectItem>
                            <SelectItem value="hourly">
                              Hourly digest
                            </SelectItem>
                            <SelectItem value="daily">Daily digest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-2">
                    <Label>Mobile Notifications</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-new-order" defaultChecked />
                        <Label
                          htmlFor="mobile-new-order"
                          className="cursor-pointer"
                        >
                          New order received
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-order-status" defaultChecked />
                        <Label
                          htmlFor="mobile-order-status"
                          className="cursor-pointer"
                        >
                          Order status updates
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-customer-feedback" />
                        <Label
                          htmlFor="mobile-customer-feedback"
                          className="cursor-pointer"
                        >
                          Customer feedback and reviews
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-inventory-alerts" defaultChecked />
                        <Label
                          htmlFor="mobile-inventory-alerts"
                          className="cursor-pointer"
                        >
                          Inventory alerts
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Connected Devices</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">iPhone 13 Pro</p>
                            <p className="text-xs text-muted-foreground">
                              Last active: Today at 10:23 AM
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="m-0 md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Lock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Change Password</p>
                            <p className="text-xs text-muted-foreground">
                              Last changed: 3 months ago
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Update</Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Two-Factor Authentication</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              Two-Factor Authentication
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                        </div>
                        <Switch id="2fa" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>API Keys</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Key className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">API Access</p>
                            <p className="text-xs text-muted-foreground">
                              Manage API keys for external integrations
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Manage Keys</Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Login Sessions</Label>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-xs text-muted-foreground">
                              Chrome on Windows • New York, USA • Started 2
                              hours ago
                            </p>
                          </div>
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign Out of All Sessions
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Account Activity</Label>
                    <div className="rounded-md border p-4 h-32 overflow-auto">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                          <div>
                            <p className="text-sm">
                              Successful login from Chrome on Windows
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Today at 10:23 AM • New York, USA
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                          <div>
                            <p className="text-sm">Password changed</p>
                            <p className="text-xs text-muted-foreground">
                              3 months ago • New York, USA
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                          <div>
                            <p className="text-sm">Failed login attempt</p>
                            <p className="text-xs text-muted-foreground">
                              4 months ago • Chicago, USA
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="link" size="sm" className="w-fit px-0">
                      View Full Activity Log
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
