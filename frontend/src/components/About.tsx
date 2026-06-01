"use client";
import { TranslationInterface } from "@/lib/translations";

interface AboutProps {
  t: TranslationInterface;
}

const About = ({ t }: AboutProps) => {
  return (
    // Updated background to black to match image_fca90c.png
    <section id="about" className="py-16 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Changed text color to white for visibility */}
        <h1 className="text-4xl font-bold mb-6 text-white">About Us</h1>

        {t.about.content.map((paragraph, index) => (
          // Changed text color to gray-300 for a softer, readable look
          <p key={index} className="mb-4 text-lg text-gray-300">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default About;
