import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

const ProductSkeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative aspect-square bg-muted animate-pulse" />
        <CardContent className="p-4">
          <div className="h-4 bg-muted rounded animate-pulse mb-2 w-1/3" />
          <div className="h-6 bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="h-6 bg-muted rounded animate-pulse w-1/4" />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductSkeleton;
