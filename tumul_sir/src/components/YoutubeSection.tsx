import React, { useRef, useEffect } from "react";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";

const videoIds = [
  "txvPN4lSopM",
  "Cl08la5qCtw",
  "xgvLKHuPAlo",
  "0ZTxa-l150I",
  "joAjV9n2wQ0",
  "SbvcFBkXqvk"
];

const YoutubeSection: React.FC = () => {
  const videoScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = videoScrollerRef.current;
    if (!scroller) return;
    let animationFrame: number;
    let paused = false;

    const singleSetWidth = scroller.scrollWidth / 2;

    const scroll = () => {
      if (!paused && scroller) {
        scroller.scrollLeft += 1;
        if (scroller.scrollLeft >= singleSetWidth) {
          scroller.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    const handleMouseEnter = () => { paused = true; };
    const handleMouseLeave = () => { paused = false; };

    scroller.addEventListener("mouseenter", handleMouseEnter);
    scroller.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      scroller.removeEventListener("mouseenter", handleMouseEnter);
      scroller.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-lavender-dark font-serif">
          Watch Dr. Tumul Raathi on YouTube
        </h2>
        <div ref={videoScrollerRef} className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar">
          {[...videoIds, ...videoIds].map((id, idx) => (
            <div key={idx} className="min-w-[500px] max-w-[500px] h-[250px] rounded-2xl shadow-lg border border-orange-100 overflow-hidden transition-transform duration-300 hover:scale-105 bg-white relative">
              <div className="absolute inset-0 bg-white" />
              <iframe
                className="relative z-10 aspect-w-1 aspect-h-1 rounded-2xl"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${id}`}
                title={`YouTube video ${idx + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <a
            href="https://www.youtube.com/@dr.tumulraathi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InteractiveHoverButton
              text="Visit Dr. Tumul Raathi's YouTube Channel"
              className="text-button text-lg px-8 py-3"
              type="button"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default YoutubeSection;
