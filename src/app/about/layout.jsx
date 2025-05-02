import MainLayout from "@/components/main-layout";

export const metadata = {
  title: "About",
  description: "Connect with suppliers and manufacturers worldwide",
};

const AboutLayout = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default AboutLayout;
