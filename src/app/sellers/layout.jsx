import MainLayout from "@/components/main-layout";

export const metadata = {
  title: "Sellers",
  description: "Connect with suppliers and manufacturers worldwide",
};

const SellerLayout = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default SellerLayout;
