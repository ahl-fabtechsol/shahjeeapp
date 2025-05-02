import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Retail Business Owner",
      content:
        "GlobalMarket has transformed how I source products for my store. The quality of suppliers and the ease of ordering has helped me grow my business by 40% in just one year.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "E-commerce Entrepreneur",
      content:
        "Finding reliable suppliers used to be my biggest challenge. With GlobalMarket, I can connect with verified manufacturers worldwide and get competitive prices on all my inventory.",
      rating: 5,
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "Dropshipping Seller",
      content:
        "The platform is intuitive and the supplier verification process gives me peace of mind. I've been able to expand my product catalog and increase my profit margins.",
      rating: 4,
    },
  ];

  return (
    <section className="w-full p-6 lg:px-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">
          What Our Customers Say
        </h2>
        <p className="text-muted-foreground mt-2 max-w-[700px] mx-auto">
          Thousands of businesses trust GlobalMarket for their sourcing needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-border/40">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="mb-4">{testimonial.content}</p>
              <div className="mt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
