import { Link } from "wouter";
import { ArrowRight, Box, Layers, Zap } from "lucide-react";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="max-w-3xl animate-in">
            <h1 className="text-6xl md:text-8xl font-display font-medium text-primary leading-[0.9] tracking-tight mb-8">
              Build better <br/>
              <span className="italic text-muted-foreground">interfaces.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed text-balance">
              A premium fullstack starter template designed for modern web applications. 
              Minimalist aesthetics, powerful tooling, and production-ready architecture.
            </p>
            
            <Link 
              href="/demo" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 hover:gap-4 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              Try the Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-32 animate-in animate-delay-200">
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Built on Vite and React for instant feedback loops and optimal performance."
            />
            <FeatureCard 
              icon={<Layers className="w-6 h-6" />}
              title="Type Safe"
              description="End-to-end type safety with TypeScript, Zod, and shared schemas."
            />
            <FeatureCard 
              icon={<Box className="w-6 h-6" />}
              title="Modern Stack"
              description="Powered by TanStack Query, Tailwind CSS, and wouter for robust applications."
            />
          </div>
        </div>
      </main>
      
      {/* Decorative Background */}
      <div className="fixed top-0 right-0 -z-10 opacity-50 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-border/40 hover:border-border hover:shadow-lg hover:shadow-black/[0.02] transition-all duration-300">
      <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
