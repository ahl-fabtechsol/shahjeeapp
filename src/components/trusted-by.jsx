import Image from "next/image";

export default function TrustedBy() {
  return (
    <section className="">
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Trusted by businesses worldwide
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {[1, 2, 3, 4, 5].map((i) => (
          <Image
            key={i}
            src={`/placeholder.svg?height=40&width=120&text=LOGO`}
            alt={`Company logo ${i}`}
            width={120}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </section>
  );
}
