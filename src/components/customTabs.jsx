"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function CustomTabs({ tabs = [], value, onValueChange, defaultValue }) {
  const isControlled =
    value !== undefined && typeof onValueChange === "function";
  const initial = defaultValue ?? (tabs[0] && tabs[0].value);

  return (
    <Tabs
      {...(isControlled ? { value, onValueChange } : { defaultValue: initial })}
      className="w-full"
    >
      <div className="w-full overflow-x-auto hide-scrollbar">
        <TabsList className="w-full flex flex-nowrap min-w-max justify-start border-b bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="
                flex-shrink-0
                px-4 py-2
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-primary
                data-[state=active]:bg-transparent
              "
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="p-0">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
