import MainLayout from "@/components/layouts/main-layout"
import Hero from "@/components/home/hero"
import FeaturedProducts from "@/components/home/featured-products"
import Categories from "@/components/home/categories"
import Testimonials from "@/components/home/testimonials"
import CallToAction from "@/components/home/call-to-action"
import TrustedBy from "@/components/home/trusted-by"

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-16 pb-16">
        <Hero />
        <TrustedBy />
        <Categories />
        <FeaturedProducts />
        <Testimonials />
        <CallToAction />
      </div>
    </MainLayout>
  )
}
