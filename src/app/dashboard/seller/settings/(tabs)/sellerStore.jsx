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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Store } from "lucide-react";
import React from "react";

const SellerStore = () => {
  return (
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
          <Input id="store-name" placeholder="Your Store Name" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="store-email">Store Email</Label>
          <Input
            id="store-email"
            type="email"
            placeholder="store@example.com"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="store-phone">Store Phone</Label>
          <Input id="store-phone" type="tel" placeholder="+1 (555) 123-4567" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="store-address">Store Address</Label>
          <Input
            id="store-address"
            placeholder="123 Store Street, City, Country"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="store-about">About Store</Label>
          <Textarea
            id="store-about"
            placeholder="Tell customers about your store"
            className="min-h-[120px]"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="store-category">Store Category</Label>
          <Select>
            <SelectTrigger id="store-category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
              <SelectItem value="beauty">Beauty & Health</SelectItem>
              <SelectItem value="toys">Toys & Games</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Store Images</Label>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Store Logo</p>
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

            <div>
              <p className="text-sm font-medium mb-2">Cover Image</p>
              <div className="flex items-center gap-4">
                <div className="h-16 w-32 rounded-md border flex items-center justify-center bg-muted">
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
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Store Status</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="store-active" defaultChecked />
              <Label htmlFor="store-active" className="cursor-pointer">
                Store Active
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
  );
};

export default SellerStore;
