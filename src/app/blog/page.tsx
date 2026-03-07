'use client';
import React, { useEffect, useState } from 'react';
import { client, urlFor } from '@/lib/sanity';
import { postsQuery } from '@/lib/sanity.queries';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Header from '../components/header';
import Footer from '../components/footer';
import { useLanguage } from '../context/language-context';
import { Skeleton } from '@/components/ui/skeleton';

function BlogIndexPage() {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client.fetch(postsQuery).then((data) => {
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
                src={urlFor(post.mainImage).width(800).height(600).url()}
                alt={title}
                width={400}
                height={300}
                className="object-cover w-full aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-muted/20"></div>
            )}
            {post.publishedAt && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-semibold px-2 py-1 rounded backdrop-blur-md">
                {language === 'fr'
                  ? format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: fr }).toUpperCase()
                  : format(new Date(post.publishedAt), 'MMMM d, yyyy').toUpperCase()}
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold font-headline mb-3 flex-grow text-white leading-tight">{title}</h3>
            <p className="text-white/70 line-clamp-3 mb-4 text-sm">
              {excerpt || "Aucun résumé disponible."}
            </p>
            <span className="font-bold tracking-widest text-[10px] text-red-400 group-hover:text-white transition-colors uppercase">
              {language === 'fr' ? 'LIRE LA SUITE' : 'READ MORE'}
            </span>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <div className="flex flex-col min-h-dvh bg-transparent">
      <Header />
      <main className="flex-1">
        <section className="pt-32 pb-16">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold font-headline mb-4 text-white uppercase tracking-tighter">
                {t('blog')}
              </h1>
              <p className="text-red-200/80 text-lg">Nos dernières actualités et conseils stratégiques.</p>
            </div>

            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="aspect-[4/5] rounded-2xl bg-white/5" />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <div key={post._id} className="h-full">
                    {renderPostCard(post)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <p className="text-red-200">Aucun article publié pour le moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BlogIndexPage;
