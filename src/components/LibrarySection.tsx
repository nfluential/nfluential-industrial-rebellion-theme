import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import bookCover1 from "@/assets/book-cover-1.jpg";
import bookCover2 from "@/assets/book-cover-2.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const books = [
  {
    id: 1,
    image: bookCover1,
    title: "Urban Confessions Vol. 1",
    author: "Asad Carter",
    price: "$24.99",
  },
  {
    id: 2,
    image: bookCover2,
    title: "Midnight Chronicles",
    author: "Asad Carter",
    price: "$22.99",
  },
  {
    id: 3,
    image: bookCover1,
    title: "Street Philosophy",
    author: "Asad Carter",
    price: "$19.99",
  },
  {
    id: 4,
    image: bookCover2,
    title: "Raw & Uncut Stories",
    author: "Asad Carter",
    price: "$21.99",
  },
];

const LibrarySection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2;
  const maxIndex = Math.max(0, books.length - itemsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  return (
    <section id="library" className="py-20 md:py-32 bg-card relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 space-y-4 ${headerVisible ? 'animate-blur-in' : 'scroll-hidden'}`}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
            [002] Literature
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            The <span className="text-primary">Library</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto">
            Featuring <span className="text-foreground">Asad Carter</span> — The Literary King of Comedy. 
            Raw stories from the streets, told with unfiltered truth.
          </p>
        </div>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className={`relative max-w-4xl mx-auto ${carouselVisible ? 'animate-blur-in' : 'scroll-hidden'}`}
        >
          {/* Navigation Buttons */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Carousel Track - Touch scrollable on mobile */}
          <div className="overflow-x-auto md:overflow-hidden mx-4 md:mx-8 scrollbar-hide touch-pan-x">
            <div 
              className="flex transition-transform duration-500 ease-out gap-6 md:gap-8 md:touch-none"
              style={{ transform: typeof window !== 'undefined' && window.innerWidth >= 768 ? `translateX(-${currentIndex * (100 / itemsPerView)}%)` : 'none' }}
            >
              {books.map((book) => (
                <div 
                  key={book.id} 
                  className="flex-shrink-0 w-[260px] md:w-[calc(50%-1rem)] group"
                >
                  {/* Book Cover */}
                  <div className="relative aspect-[2/3] overflow-hidden shadow-2xl mb-6 transform group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Vinyl-style hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Book Info */}
                  <div className="space-y-2 text-center">
                    <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide">
                      {book.title}
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground">
                      by {book.author}
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <span className="font-mono text-lg text-primary font-bold">
                        {book.price}
                      </span>
                      <Button variant="outline" size="sm">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibrarySection;
