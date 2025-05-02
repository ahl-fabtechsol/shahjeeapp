import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "./startRating";

const ProductCard = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
      }}
    >
      <Link href={`/products/${product.id}`} className="group block h-full">
        <Card className="overflow-hidden border-border/40 transition-all hover:shadow-lg h-full bg-card/50 backdrop-blur-sm">
          <div className="relative aspect-square overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>
            {product.badge && (
              <Badge className="absolute top-2 right-2 z-10 shadow-md">
                {product.badge}
              </Badge>
            )}
            <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-md"
                      >
                        <ShoppingCart size={16} />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-md"
                      >
                        <Heart size={16} />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to wishlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">
              {product.category}
            </div>
            <h3 className="font-medium text-lg truncate group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <StarRating rating={product.rating} reviews={product.reviews} />
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="font-semibold text-lg">
              ${product.price.toFixed(2)}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
