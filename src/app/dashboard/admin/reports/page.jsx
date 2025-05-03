"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  Calendar,
  Clock,
  Download,
  FileText,
  Filter,
  LineChart,
  MoreHorizontal,
  PieChart,
  Plus,
  Search,
  Share2,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample reports data
const reports = [
  {
    id: "REP-1001",
    title: "Monthly Revenue Report",
    description: "Comprehensive analysis of platform revenue for April 2023",
    type: "Financial",
    format: "PDF",
    created: "2023-05-01",
    author: "System",
    size: "2.4 MB",
    scheduled: true,
    frequency: "Monthly",
  },
  {
    id: "REP-1002",
    title: "User Growth Analysis",
    description: "Detailed breakdown of user acquisition and retention metrics",
    type: "User",
    format: "Excel",
    created: "2023-04-28",
    author: "Admin",
    size: "1.8 MB",
    scheduled: false,
    frequency: "N/A",
  },
  {
    id: "REP-1003",
    title: "Seller Performance Report",
    description: "Analysis of top performing sellers and product categories",
    type: "Seller",
    format: "PDF",
    created: "2023-04-25",
    author: "System",
    size: "3.2 MB",
    scheduled: true,
    frequency: "Weekly",
  },
  {
    id: "REP-1004",
    title: "Product Category Analysis",
    description: "Breakdown of sales by product category and subcategory",
    type: "Product",
    format: "Excel",
    created: "2023-04-22",
    author: "Admin",
    size: "4.1 MB",
    scheduled: false,
    frequency: "N/A",
  },
  {
    id: "REP-1005",
    title: "Platform Health Metrics",
    description: "System performance, uptime, and technical metrics",
    type: "System",
    format: "PDF",
    created: "2023-04-20",
    author: "System",
    size: "1.5 MB",
    scheduled: true,
    frequency: "Daily",
  },
  {
    id: "REP-1006",
    title: "Customer Satisfaction Survey",
    description: "Analysis of customer feedback and satisfaction scores",
    type: "Customer",
    format: "PDF",
    created: "2023-04-18",
    author: "Admin",
    size: "2.7 MB",
    scheduled: true,
    frequency: "Quarterly",
  },
  {
    id: "REP-1007",
    title: "Marketing Campaign Performance",
    description: "ROI analysis of recent marketing initiatives",
    type: "Marketing",
    format: "Excel",
    created: "2023-04-15",
    author: "Admin",
    size: "3.5 MB",
    scheduled: false,
    frequency: "N/A",
  },
  {
    id: "REP-1008",
    title: "Fraud Detection Report",
    description:
      "Analysis of potential fraudulent activities and prevention measures",
    type: "Security",
    format: "PDF",
    created: "2023-04-12",
    author: "System",
    size: "1.9 MB",
    scheduled: true,
    frequency: "Weekly",
  },
];

// Sample report templates
const reportTemplates = [
  {
    id: "TEMP-1001",
    title: "Financial Performance",
    description: "Revenue, transactions, and financial metrics",
    icon: BarChart2,
  },
  {
    id: "TEMP-1002",
    title: "User Analytics",
    description: "User growth, engagement, and behavior",
    icon: LineChart,
  },
  {
    id: "TEMP-1003",
    title: "Seller Performance",
    description: "Seller metrics, ratings, and revenue",
    icon: PieChart,
  },
  {
    id: "TEMP-1004",
    title: "Product Analysis",
    description: "Product performance and category breakdown",
    icon: BarChart2,
  },
  {
    id: "TEMP-1005",
    title: "System Health",
    description: "Platform performance and technical metrics",
    icon: LineChart,
  },
  {
    id: "TEMP-1006",
    title: "Custom Report",
    description: "Build a custom report with selected metrics",
    icon: FileText,
  },
];

export default function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredReports = () => {
    let filtered = reports.filter(
      (report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab !== "all") {
      filtered = filtered.filter(
        (report) => report.type.toLowerCase() === activeTab.toLowerCase()
      );
    }

    return filtered;
  };

  const filteredReports = getFilteredReports();

  const getTypeColor = (type) => {
    switch (type) {
      case "Financial":
        return "bg-green-50 text-green-700 border-green-200";
      case "User":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Seller":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Product":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "System":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "Customer":
        return "bg-pink-50 text-pink-700 border-pink-200";
      case "Marketing":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Security":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getFormatColor = (format) => {
    switch (format) {
      case "PDF":
        return "bg-red-50 text-red-700 border-red-200";
      case "Excel":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Generate and manage platform reports and analytics.
            </p>
          </div>
          <Button className="sm:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Create Report
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" /> Schedule
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" /> History
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {report.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {report.description}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" /> Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" /> Schedule
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge
                          variant="outline"
                          className={getTypeColor(report.type)}
                        >
                          {report.type}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getFormatColor(report.format)}
                        >
                          {report.format}
                        </Badge>
                        {report.scheduled && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {report.frequency}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex justify-between mb-1">
                          <span>Created:</span>
                          <span>{report.created}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Author:</span>
                          <span>{report.author}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2" />
                <p>No reports found matching your criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Report Templates</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <template.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {template.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Use Template
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
