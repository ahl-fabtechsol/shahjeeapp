import { Sellers } from "./(components)/sellers";

export default function SellerPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Our Trusted Sellers</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Browse through our verified sellers and discover quality products from
        businesses you can trust. Each seller is rated based on customer
        satisfaction and sales performance.
      </p>
      <Sellers />
    </div>
  );
}
