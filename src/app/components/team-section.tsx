'use client';

import React, { useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function TeamSection() {
  const firestore = useFirestore();
  
  const teamQuery = useMemoFirebase(
    () => query(collection(firestore, 'team_members'), orderBy('order')),
    [firestore]
  );
  const { data: members, isLoading: isLoadingMembers } = useCollection(teamQuery);
  
  const duplicatedMembers = useMemo(() => {
    if (!members || members.length === 0) return [];
    // Ensure the list is long enough for a seamless loop
    let duplicated = [...members];
    while (duplicated.length < 10) { // arbitrary number to make it long
        duplicated = [...duplicated, ...members];
    }
    return [...duplicated, ...duplicated]; // Duplicate the whole list for the animation
  }, [members]);

  const renderMemberCard = (member: any, index: number) => (
    <Card key={`${member.id}-${index}`} className="border-none shadow-none bg-transparent flex-shrink-0" style={{ width: '160px' }}>
        <CardContent className="p-0 flex flex-col items-center text-center gap-4">
            <Image 
                src={member.imageUrl}
                alt={member.name}
                width={128}
                height={128}
                className="rounded-full object-cover aspect-square w-32 h-32"
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
        return <p className="text-center">Chargement de l'équipe...</p>
    }

    if (!members || members.length === 0) {
        return <p className="text-center text-muted-foreground">Aucun membre d'équipe disponible.</p>
    }

     return (
         <div className="relative marquee group overflow-hidden">
            <div className="marquee-content flex flex-nowrap group-hover:[animation-play-state:paused]">
                {duplicatedMembers.map((member, index) => renderMemberCard(member, index))}
            </div>
             <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
             <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
    )
  }
  
  return (
    <section 
        id="team" 
        className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground"
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
