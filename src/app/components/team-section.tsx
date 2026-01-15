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
    // Duplicate the members array to create a seamless loop
    const items = [...members, ...members];
    // Ensure we have enough items to fill the screen and loop
    if (items.length < 10) {
        return [...items, ...items];
    }
    return items;
  }, [members]);

  const renderMemberCard = (member: any, index: number) => {
    const nameParts = member.name.split(' ');
    const lastName = nameParts.pop() || '';
    const firstName = nameParts.join(' ');

    return (
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
                    <h3 className="font-bold text-lg font-headline tracking-wide text-white">
                        <span>{firstName}</span>
                        {lastName && <br />}
                        <span>{lastName}</span>
                    </h3>
                    <p className="text-white/80">{member.position}</p>
                </div>
            </CardContent>
        </Card>
    );
  };

  const renderContent = () => {
    if (isLoadingMembers) {
        return <p className="text-center text-white">Chargement de l'équipe...</p>
    }

    if (!duplicatedMembers || duplicatedMembers.length === 0) {
        return <p className="text-center text-white/80">Aucun membre d'équipe disponible.</p>
    }

     return (
        <div className="team-marquee-container">
            <div className="marquee">
                <div className="marquee-content flex flex-nowrap group-hover:[animation-play-state:paused] gap-x-8">
                    {duplicatedMembers.map((member, index) => renderMemberCard(member, index))}
                </div>
            </div>
        </div>
    )
  }
  
  return (
    <section 
        id="team" 
        className="w-full py-12 md:py-24 lg:py-32 bg-transparent text-foreground"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline text-white">
              Notre Équipe
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-white/80">
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
