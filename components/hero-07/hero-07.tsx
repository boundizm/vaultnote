import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, Lock } from "lucide-react";
import Link from "next/link";

const Hero07 = () => {
  return (
    <div className="relative flex items-center justify-center px-6 py-24 sm:py-32 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <div className="relative z-10 text-center max-w-3xl">
        <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
          <Shield className="mr-2 h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Military-Grade Security</span>
        </div>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-bold tracking-tight">
          <span className="block">Secure notes with</span>
          <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            automatic deletion
          </span>
        </h1>
        <p className="mt-6 md:text-lg">
          Create encrypted notes that self-destruct after reading or time expiration.
          Zero-knowledge encryption ensures your privacy.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base" asChild>
            <Link href="/create">
              <Lock className="mr-2 h-5 w-5" />
              Create Secure Note
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 px-8 text-base shadow-none"
            asChild
          >
            <Link href="/security">
              Learn About Security
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero07;
