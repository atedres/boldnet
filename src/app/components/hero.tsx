import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container grid place-content-center gap-6 pb-8 pt-6 md:py-10 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl font-headline">
          Amplify Your Brand.
          <br />
          <span className="text-primary">Dominate the Market.</span>
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground">
          BoldNet Digital drives growth with high-impact strategies and data-driven results. We turn clicks into customers.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="#contact">Get Started</Link>
        </Button>
      </div>
    </section>
  );
}
