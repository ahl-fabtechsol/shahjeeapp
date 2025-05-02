import MainLayout from "@/components/main-layout";

export const metadata = {
  title: "Cart",
  description: "Connect with suppliers and manufacturers worldwide",
};

const CartLayout = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default CartLayout;
