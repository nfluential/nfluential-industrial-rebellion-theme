import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bookCover1 from "@/assets/book-cover-1.jpg";
import bookCover2 from "@/assets/book-cover-2.jpg";

const books = [
  {
    id: 1,
    title: "The Nfluential Mindset",
    author: "Available Soon",
    image: bookCover1,
    description: "A guide to building an unshakeable mindset for success in business and life.",
    status: "coming-soon"
  },
  {
    id: 2,
    title: "Empire Builder's Journal",
    author: "Available Soon",
    image: bookCover2,
    description: "The daily journal for entrepreneurs who refuse to settle for mediocrity.",
    status: "coming-soon"
  }
];

const Library = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        <div className="container px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-muted-foreground uppercase mb-3 sm:mb-4">
              Knowledge is Power
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              THE <span className="text-primary glow-eagles">LIBRARY</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
              Books, journals, and resources for the Nfluential minded.
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-glow group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover grayscale-hover"
                    loading="lazy"
                  />
                  {book.status === "coming-soon" && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="font-mono text-sm uppercase tracking-widest text-primary">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6 space-y-3">
                  <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {book.author}
                  </p>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center mt-12 sm:mt-16">
            <p className="font-mono text-sm text-muted-foreground mb-4">
              More titles coming soon. Stay Nfluential.
            </p>
            <Link 
              to="/#newsletter" 
              className="font-mono text-xs uppercase tracking-widest text-primary hover:underline"
            >
              Get notified of new releases →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Library;
