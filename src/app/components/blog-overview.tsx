'use client';
import React from 'react';
import { useLanguage } from '@/app/context/language-context';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogOverview({ content }: { content: any }) {
  const { t } = useLanguage();
  const firestore = useFirestore();
  
  const postsQuery = useMemoFirebase(
    () => query(collection(firestore, 'blog_posts'), orderBy('createdAt', 'desc'), limit(3)),
    [firestore]
  );
  const { data: posts, isLoading: isLoadingPosts } = useCollection(postsQuery);

  const renderPostCard = (post: any) => (
    <Card key={post.id} className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
       {post.imageUrl && (
        <div className="aspect-video relative overflow-hidden">
            <Image 
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
        </div>
       )}
        <CardHeader>
            <CardTitle className="text-xl font-bold font-headline">{post.title}</CardTitle>
            {post.createdAt && (
                <p className="text-sm text-muted-foreground">{format(post.createdAt.toDate(), 'PPP')}</p>
            )}
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-muted-foreground line-clamp-3">
                {post.excerpt}
            </p>
        </CardContent>
        <CardFooter>
            <Button variant="link" asChild className="p-0">
                <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
    </Card>
  );

  const renderContent = () => {
    if (isLoadingPosts) {
        return <p className="text-center">Loading posts...</p>
    }

    if (!posts || posts.length === 0) {
        return <p className="text-center text-muted-foreground">No blog posts available yet.</p>
    }
    
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(renderPostCard)}
        </div>
    )
  }
  
  return (
    <section 
        id="blog" 
        className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 text-foreground"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline text-foreground">
              {content?.title || 'From the Blog'}
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
              {content?.subtitle || 'Check out our latest articles and insights.'}
            </p>
          </div>
        </div>
        <div className="mt-12">
            {renderContent()}
        </div>
      </div>
    </section>
  );
}
