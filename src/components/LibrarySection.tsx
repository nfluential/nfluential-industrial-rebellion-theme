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
];

const LibrarySection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: booksRef, isVisible: booksVisible } = useScrollAnimation({ threshold: 0.1 });

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

        {/* Books Display - Album Cover Style */}
        <div 
          ref={booksRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto"
        >
          {books.map((book, index) => (
            <div 
              key={book.id} 
              className={`group ${booksVisible ? (index === 0 ? 'animate-slide-right' : 'animate-slide-left') : 'scroll-hidden'}`}
              style={{ animationDelay: `${index * 150}ms` }}
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
              <div className="space-y-2 text-center md:text-left">
                <h3 className="font-display text-2xl uppercase tracking-wide">
                  {book.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground">
                  by {book.author}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
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
    </section>
  );
};

export default LibrarySection;
