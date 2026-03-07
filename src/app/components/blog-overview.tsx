'use client';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export default function BlogOverview({ content }: { content: any }) {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      excerpt_en,
      mainImage,
      publishedAt
    }`;
    client.fetch(query).then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

  const renderPostCard = (post: any) => {
    const title = post.title;
    const excerpt = language === 'fr' ? post.excerpt : post.excerpt_en;

    return (
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <Card className="flex flex-col h-full bg-black/40 backdrop-blur-sm text-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl border-white/10 overflow-hidden">
          <div className="overflow-hidden relative">
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(600).height(400).url()}
                alt={title}
                width={400}
                height={250}
                className="object-cover w-full aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-muted/20"></div>
            )}
            {post.publishedAt && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-semibold px-2 py-1 rounded backdrop-blur-md">
                {language === 'fr'
                  ? format(new Date(post.publishedAt), 'd MMM yyyy', { locale: fr }).toUpperCase()
                  : format(new Date(post.publishedAt), 'MMM d, yyyy').toUpperCase()}
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-bold font-headline mb-3 flex-grow text-white leading-tight">{title}</h3>
            <p className="text-white/70 line-clamp-2 mb-4 text-xs">
              {excerpt}
            </p>
            <span className="font-bold tracking-widest text-[10px] text-red-400 group-hover:text-white transition-colors uppercase">
              {language === 'fr' ? 'LIRE L\'ARTICLE' : 'READ POST'}
            </span>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-transparent text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline uppercase tracking-tighter">
              {content?.title?.[language] || content?.title || t('blog')}
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed text-red-200/80">
              {content?.subtitle?.[language] || content?.subtitle || "Restez à la pointe de l'innovation digitale."}
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="aspect-[4/5] bg-white/5 rounded-2xl animate-pulse" />)}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <div key={post._id} className="w-full max-w-md h-full">
                  {renderPostCard(post)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-red-200/60 italic">Bientôt de nouveaux articles...</p>
          )}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="rounded-full bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white font-bold uppercase tracking-widest text-xs px-8 py-6">
            <Link href="/blog">
              {language === 'fr' ? 'VOIR TOUS LES ARTICLES' : 'VIEW ALL POSTS'} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
