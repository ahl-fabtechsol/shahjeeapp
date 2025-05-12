"use client";

import { Store, User } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellerProfile from "./(tabs)/sellerProfile";
import SellerStore from "./(tabs)/sellerStore";

export default function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile and store preferences.
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your profile and store settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto hide-scrollbar">
                  <TabsList className="w-full flex flex-nowrap min-w-max justify-start border-b bg-transparent p-0">
                    <TabsTrigger
                      value="profile"
                      className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
                    >
                      <User className="h-4 w-4 mr-2" /> Manage Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="store"
                      className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
                    >
                      <Store className="h-4 w-4 mr-2" /> Manage Store
                    </TabsTrigger>
                  </TabsList>
                </div>
              </CardContent>
            </Card>

            <TabsContent value="profile" className="m-0">
              <SellerProfile />
            </TabsContent>

            <TabsContent value="store" className="m-0">
              <SellerStore />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
