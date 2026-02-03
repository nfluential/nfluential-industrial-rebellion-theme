import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import { useCartSync } from "./hooks/useCartSync";

const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Auth = lazy(() => import("./pages/Auth"));
const Search = lazy(() => import("./pages/Search"));
const Shop = lazy(() => import("./pages/Shop"));
const Library = lazy(() => import("./pages/Library"));

const queryClient = new QueryClient();

function CartSyncProvider({ children }: { children: React.ReactNode }) {
  useCartSync();
  return <>{children}</>;
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartSyncProvider>
          {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/library" element={<Library />} />
                <Route path="/product/:handle" element={<ProductPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/search" element={<Search />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CartSyncProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
