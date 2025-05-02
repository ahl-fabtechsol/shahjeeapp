import MainLayout from "@/components/main-layout";

export const metadata = {
  title: "Products | GlobalMarket",
  description:
    "Browse our wide range of products from verified suppliers worldwide",
};

const ProductsLayout = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default ProductsLayout;
