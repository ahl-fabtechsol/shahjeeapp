"use client";

import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const FilterSidebar = ({ isMobile }) => {
  const [priceRange, setPriceRange] = useState([0, 500]);

  return (
    <motion.div
      initial={isMobile ? { x: -300, opacity: 0 } : { opacity: 1 }}
      animate={isMobile ? { x: 0, opacity: 1 } : { opacity: 1 }}
      exit={isMobile ? { x: -300, opacity: 0 } : { opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-6 p-4"
    >
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {[
            "Electronics",
            "Fashion",
            "Home & Garden",
            "Beauty",
            "Sports & Fitness",
          ].map((category) => (
            <motion.div
              key={category}
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Checkbox id={category.toLowerCase().replace(/\s+/g, "")} />
              <Label htmlFor={category.toLowerCase().replace(/\s+/g, "")}>
                {category}
              </Label>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={1000}
          step={10}
          onValueChange={setPriceRange}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <motion.div
              key={rating}
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Checkbox id={`rating${rating}`} />
              <Label htmlFor={`rating${rating}`}>{rating}★ & above</Label>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Shipping</h3>
        <div className="space-y-2">
          {["Free Shipping", "Same Day Delivery"].map((option) => (
            <motion.div
              key={option}
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Checkbox id={option.toLowerCase().replace(/\s+/g, "")} />
              <Label htmlFor={option.toLowerCase().replace(/\s+/g, "")}>
                {option}
              </Label>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button className="w-full">Apply Filters</Button>
      </motion.div>
    </motion.div>
  );
};

export default FilterSidebar;
