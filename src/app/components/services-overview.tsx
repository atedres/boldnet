import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Clapperboard,
  LayoutTemplate,
  Megaphone,
  PenTool,
} from 'lucide-react';

const services = [
  {
    icon: Clapperboard,
    title: 'UGC Videos',
    description:
      'Harness the power of authentic user-generated content to build trust and drive engagement. We create video campaigns that resonate.',
  },
  {
    icon: LayoutTemplate,
    title: 'Website & Landing Pages',
    description:
      'From stunning websites to high-converting landing pages, we build digital storefronts that are fast, responsive, and optimized for sales.',
  },
  {
    icon: PenTool,
    title: 'Professional Post Design',
    description:
      'Elevate your social media presence with professionally designed posts. We create eye-catching visuals that stop the scroll and tell your brand’s story.',
  },
  {
    icon: Megaphone,
    title: 'Ads & Advertising',
    description:
      'Reach your target audience with precision-targeted ad campaigns. We manage your ad spend effectively across all major platforms for maximum ROI.',
  },
];

export default function ServicesOverview() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Our Services
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a comprehensive suite of digital marketing services designed to elevate your brand and accelerate your growth.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
