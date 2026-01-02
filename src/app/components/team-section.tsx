'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';


export default function TeamSection() {
  const firestore = useFirestore();
  const isMobile = useIsMobile();
  
  const teamQuery = useMemoFirebase(
    () => query(collection(firestore, 'team_members'), orderBy('order')),
    [firestore]
  );
  const { data: members, isLoading: isLoadingMembers } = useCollection(teamQuery);

  const renderMemberCard = (member: any) => (
    <Card key={member.id} className="border-none shadow-none bg-transparent">
        <CardContent className="p-0 flex flex-col items-center text-center gap-4">
            <Image 
                src={member.imageUrl}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full object-cover aspect-square w-32 h-32 md:w-40 md:h-40"
            />
            <div>
                <h3 className="font-bold text-lg font-headline">{member.name}</h3>
                <p className="text-primary">{member.position}</p>
            </div>
        </CardContent>
    </Card>
  );

  const renderContent = () => {
    if (isLoadingMembers) {
        return <p className="text-center">Loading team...</p>
    }

    if (!members || members.length === 0) {
        return <p className="text-center text-muted-foreground">No team members available.</p>
    }

    const useCarouselView = (isMobile && members.length > 1) || members.length > 3;

    if (useCarouselView) {
        return (
             <Carousel 
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-sm md:max-w-xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                <CarouselContent>
                    {members.map((member) => (
                        <CarouselItem key={member.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <div className="p-1 h-full">
                                {renderMemberCard(member)}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        )
    }

    return (
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-8 mt-12">
            {members.map(member => <div key={member.id} className="h-full">{renderMemberCard(member)}</div>)}
        </div>
    )
  }
  
  return (
    <section 
        id="team" 
        className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 text-foreground"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline text-foreground">
              Notre Équipe
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
              Rencontrez les experts qui donnent vie à vos projets.
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
