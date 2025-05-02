import MainLayout from "@/components/main-layout";

export const metadata = {
  title: "Deals",
  description: "Connect with suppliers and manufacturers worldwide",
};

const DealsLayout = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default DealsLayout;
