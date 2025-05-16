"use client";

import MainLayout from "@/components/layouts/main-layout";
import Hero from "@/components/home/hero";
import FeaturedProducts from "@/components/home/featured-products";
import Categories from "@/components/home/categories";
import Testimonials from "@/components/home/testimonials";
import CallToAction from "@/components/home/call-to-action";
import TrustedBy from "@/components/home/trusted-by";
import { isLoggedIn } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getHomePageData } from "@/services/dashboardService";

export default function Home() {
  const {
    data: homeData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryFn: () => getHomePageData(),
    queryKey: ["homeData"],
    staleTime: 1000 * 60 * 5,
    enabled: true,
    retry: 1,
  });
  const loggedIn = isLoggedIn();
  if (isError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching Home Page data</p>
        <p>{error?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isLoading || isFetching || !homeData) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  return (
    <MainLayout>
      <div className="flex flex-col gap-16 pb-16">
        <Hero data={homeData?.sliders} />
        {/* <TrustedBy /> */}
        <Categories data={homeData?.categories} />
        {/* <Testimonials /> */}
        <FeaturedProducts data={homeData?.featuredProducts} />
        {!loggedIn && <CallToAction />}
      </div>
    </MainLayout>
  );
}
