"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const team = [
  {
    name: "Ali Akbar",
    role: "Co-Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1603415526960-f8f0a2a5e36f?q=80&w=800",
  },
  {
    name: "Memon",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800",
  },
  {
    name: "Hasni",
    role: "Product Lead",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We’re building a powerful eCommerce ecosystem where buyers find what
          they love, and sellers grow with ease. Our goal? To make online
          commerce smoother, smarter, and more human.
        </p>
      </motion.div>

      <Separator className="mb-12" />
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
              <p className="text-muted-foreground">
                To simplify and empower digital commerce by connecting
                trustworthy sellers with passionate buyers — all while ensuring
                fairness, accessibility, and innovation.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
              <p className="text-muted-foreground">
                To become the go-to platform for eCommerce — where transactions
                are smooth, experiences are delightful, and every entrepreneur
                has the tools to succeed.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-muted-foreground">
          We’re a passionate group of engineers, designers, and thinkers
          building something meaningful.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="text-center py-6">
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
