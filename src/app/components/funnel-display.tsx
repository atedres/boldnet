import {
  Globe,
  MousePointerClick,
  PlayCircle,
  TrendingUp,
} from 'lucide-react';

const funnelSteps = [
  {
    icon: Globe,
    title: 'Online Presence',
    description:
      'We establish a strong and cohesive online identity for your brand, making you discoverable and memorable to your target audience.',
  },
  {
    icon: PlayCircle,
    title: 'Engaging Videos',
    description:
      'Through compelling video content, we capture attention, tell your story, and create an emotional connection with viewers.',
  },
  {
    icon: TrendingUp,
    title: 'Strategic Advertising',
    description:
      'We drive targeted traffic and generate leads with data-driven advertising campaigns that deliver measurable results and high ROI.',
  },
  {
    icon: MousePointerClick,
    title: 'Conversion-Focused Web',
    description:
      'Your website and landing pages are optimized to convert visitors into loyal customers, completing the journey from prospect to sale.',
  },
];

export default function FunnelDisplay() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Our High-Performance Funnel
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our proven four-step process transforms passive browsers into active buyers, guiding them seamlessly through the customer journey.
            </p>
          </div>
        </div>
        <div className="relative mt-12 max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 md:left-9 top-0 h-full w-0.5 bg-border -z-10" aria-hidden="true"></div>
          {funnelSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-6 md:gap-8 mb-12 flex-col md:flex-row text-center md:text-left"
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-card border-4 border-primary flex items-center justify-center mx-auto md:mx-0">
                <step.icon className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline">{step.title}</h3>
                <p className="text-muted-foreground mt-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
