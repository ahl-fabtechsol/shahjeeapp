"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSliders } from "@/services/slidersService";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import SliderDialog from "./SlidersDialog";

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

const SlidersActionPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [mode, setMode] = useState("add");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [sliderDialogOpen, setSliderDialogOpen] = useState(false);
  const {
    data: sliders,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["sliders", page, limit],
    queryFn: () => getSliders({ page, limit }),
    retry: 1,
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });

  const handleDelete = async () => {};

  if (isLoading || isFetching) {
    return (
      <div className="h-full flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching sliders</p>
        <p>{error?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  return (
    <motion.div variants={containerAnimation} initial="hidden" animate="show">
      {deleteConfirmation && (
        <ConfirmationModal
          title="Delete Slider"
          description="Are you sure you want to delete this slider?"
          open={deleteConfirmation}
          onOpenChange={setDeleteConfirmation}
          onConfirm={handleDelete}
        />
      )}
      {sliderDialogOpen && (
        <SliderDialog
          mode={mode}
          slider={selectedSlider}
          open={sliderDialogOpen}
          onOpenChange={setSliderDialogOpen}
        />
      )}
      <Card>
        <CardHeader className="flex flex-row gap-4 flex-wrap items-center justify-between">
          <div>
            <CardTitle>Slider Management</CardTitle>
            <CardDescription>
              Manage hero sliders that appear on your landing page
            </CardDescription>
          </div>
          <Button
            onClick={() => {
              setMode("add");
              setSelectedSlider(null);
              setSliderDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Slider
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sliders?.results?.map((slider, index) => (
                <motion.tr
                  key={index}
                  variants={itemAnimation}
                  className="group"
                >
                  <TableCell>
                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={slider?.image || "/placeholder.svg"}
                        alt={slider?.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{slider.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {slider?.description?.length > 60
                      ? `${slider?.description?.substring(0, 60)}...`
                      : slider?.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setMode("edit");
                          setSelectedSlider(slider);
                          setSliderDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteConfirmation(true)}
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
  );
};

export default SlidersActionPage;
