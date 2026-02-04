import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCarousel } from "@/hooks/useCarousel";
import bookCover1 from "@/assets/book-cover-1.jpg";
import bookCover2 from "@/assets/book-cover-2.jpg";

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
  
  const {
    currentIndex,
    itemsPerView,
    maxIndex,
    handlePrev,
    handleNext,
    goToIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    canGoPrev,
    canGoNext,
  } = useCarousel({
    totalItems: books.length,
    breakpoints: { sm: 1, md: 2, lg: 2 },
  });

  return (
    <section id="library" className="py-16 sm:py-20 md:py-32 bg-card relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4 ${headerVisible ? 'animate-blur-in' : 'scroll-hidden'}`}
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground uppercase">
            [002] Literature
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold">
            The <span className="text-primary">Library</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto px-4">
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
            disabled={!canGoPrev}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-2 md:-ml-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNext}
            disabled={!canGoNext}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-2 md:-mr-4 bg-background/80 backdrop-blur-sm disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          {/* Carousel Track */}
          <div 
            className="overflow-hidden mx-0 sm:mx-4 md:mx-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6 md:gap-8"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {books.map((book) => (
                <div 
                  key={book.id} 
                  className="flex-shrink-0 w-full sm:w-[calc(50%-1rem)] group"
                >
                  {/* Book Cover */}
                  <div className="relative aspect-[2/3] overflow-hidden shadow-2xl mb-4 sm:mb-6 transform group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Book Info */}
                  <div className="space-y-1.5 sm:space-y-2 text-center">
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl uppercase tracking-wide line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-muted-foreground">
                      by {book.author}
                    </p>
                    <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
                      <span className="font-mono text-base sm:text-lg text-primary font-bold">
                        {book.price}
                      </span>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swipe Indicator (Mobile) */}
          <div className="flex sm:hidden justify-center items-center gap-2 mt-4 text-muted-foreground">
            <span className="text-lg animate-pulse">←</span>
            <span className="font-mono text-[10px] uppercase tracking-widest">Swipe</span>
            <span className="text-lg animate-pulse">→</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-primary w-4 sm:w-6' : 'bg-muted-foreground/30'
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
