'use client';

import { useEffect, useState, use } from 'react';
import { client, urlFor } from '@/lib/sanity';
import { postBySlugQuery } from '@/lib/sanity.queries';
import { PortableText } from '@portabletext/react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import ContactSection from '@/app/components/contact-section';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useLanguage } from '@/app/context/language-context';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Blog image'}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl font-bold font-headline text-white mt-12 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold font-headline text-white mt-8 mb-3">{children}</h3>,
    normal: ({ children }: any) => <p className="text-red-50/80 leading-relaxed mb-6">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-6 text-red-50/80 space-y-2">{children}</ul>,
  },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { language } = useLanguage();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    client.fetch(postBySlugQuery, { slug }).then((data) => {
      setPost(data);
      setIsLoading(false);
    });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-dvh bg-transparent">
        <Header />
        <main className="flex-1 container pt-32 px-4 max-w-4xl">
          <Skeleton className="h-12 w-3/4 mb-6 bg-white/5" />
          <Skeleton className="h-[400px] w-full rounded-2xl bg-white/5 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-2/3 bg-white/5" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-dvh bg-transparent">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold text-white mb-4">Article introuvable</h1>
          <Button asChild variant="outline" className="border-white/20 text-white">
            <Link href="/blog">Retour au blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const body = language === 'fr' ? post.body : post.body_en;

  return (
    <div className="flex flex-col min-h-dvh bg-transparent">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <article className="container px-4 max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-red-300 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour au blog
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-white leading-tight mb-6 uppercase tracking-tighter">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-red-200/60 text-sm">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <Image
                      src={urlFor(post.author.image).width(40).height(40).url()}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="font-bold text-red-200">{post.author.name}</span>
                </div>
              )}
              <span>•</span>
              <span>
                {language === 'fr'
                  ? format(new Date(post.publishedAt), 'PPP', { locale: fr })
                  : format(new Date(post.publishedAt), 'PPP')}
              </span>
            </div>
          </header>

          {post.mainImage && (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10">
              <Image
                src={urlFor(post.mainImage).width(1200).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none prose-headings:font-headline prose-p:text-red-50/80 prose-strong:text-white prose-blockquote:border-red-500">
            {body ? (
              <PortableText value={body} components={components} />
            ) : (
              <p>Contenu non disponible dans cette langue.</p>
            )}
          </div>
        </article>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
