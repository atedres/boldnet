'use client';

import { useState, useMemo } from 'react';
import { collection, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { format } from 'date-fns';
import { useLanguage } from '@/app/context/language-context';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Trash2, ArrowUp, ArrowDown, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';


function SubmissionDetailsModal({ submission }: { submission: any }) {
    const { t } = useLanguage();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">{t('viewDetails')}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{t('contactSubmissionDetails')}</DialogTitle>
                    <DialogDescription>
                        {t('submissionFrom')} {submission.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-sm">
                    <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-2">
                        <p className="font-semibold">{t('name')}:</p>
                        <p>{submission.name}</p>
                        <p className="font-semibold">{t('email')}:</p>
                        <p className="break-all">{submission.email}</p>
                        <p className="font-semibold">{t('submitted')}:</p>
                        <p>{submission.submittedAt ? format(submission.submittedAt.toDate(), 'PPP p') : 'N/A'}</p>
                    </div>
                    <hr className="my-2" />
                    <div>
                        <p className="font-semibold mb-2">{t('message')}:</p>
                        <p className="text-muted-foreground whitespace-pre-wrap">{submission.message}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default function ContactSubmissionManagement() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const { t } = useLanguage();
    const [submissionToDelete, setSubmissionToDelete] = useState<{id: string; name: string} | null>(null);
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
    const [searchTerm, setSearchTerm] = useState('');


    const submissionsQuery = useMemoFirebase(() => {
      const baseCollection = collection(firestore, 'contact_form_submissions');
      return query(baseCollection, orderBy('submittedAt', sortOrder));
    }, [firestore, sortOrder]);

    const { data: allSubmissions, isLoading: isLoadingSubmissions } = useCollection(submissionsQuery);

    const filteredSubmissions = useMemo(() => {
        if (!allSubmissions) return [];
        
        return allSubmissions.filter(sub => {
            const searchMatch = !searchTerm || 
                                sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                sub.email.toLowerCase().includes(searchTerm.toLowerCase());
            return searchMatch;
        });

    }, [allSubmissions, searchTerm]);
    
    const confirmDelete = async () => {
        if (!submissionToDelete) return;
        try {
          await deleteDoc(doc(firestore, 'contact_form_submissions', submissionToDelete.id));
          toast({ title: t('submissionDeletedTitle'), description: t('submissionDeletedMessage', submissionToDelete.name) });
        } catch (error) {
          toast({ variant: 'destructive', title: 'Error', description: t('submissionDeleteError') });
          console.error("Error deleting contact submission:", error);
        } finally {
          setSubmissionToDelete(null);
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp || !timestamp.toDate) return 'Invalid Date';
        return format(timestamp.toDate(), 'PPP');
    }

    return (
        <>
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
                <Card className="w-full">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                           <div className="flex-1">
                             <CardTitle>{t('manageContactSubmissions')}</CardTitle>
                             <CardDescription>
                                 {t('manageContactSubmissionsDesc')}
                             </CardDescription>
                           </div>
                           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                               <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder={t('searchByNameOrEmail')}
                                        className="pl-8 sm:w-[200px] lg:w-[300px]"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                               <Button variant="outline" size="icon" onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}>
                                {sortOrder === 'desc' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                                <span className="sr-only">{t('toggleSortOrder')}</span>
                               </Button>
                           </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                         {isLoadingSubmissions && <p className="text-center py-8">{t('loadingSubmissions')}</p>}
                         {!isLoadingSubmissions && filteredSubmissions && filteredSubmissions.length === 0 && <p className="text-center text-muted-foreground py-8">{t('noSubmissionsMatchFilters')}</p>}
                         {!isLoadingSubmissions && filteredSubmissions && filteredSubmissions.length > 0 && (
                             <Table>
                                 <TableHeader>
                                     <TableRow>
                                         <TableHead>{t('date')}</TableHead>
                                         <TableHead>{t('name')}</TableHead>
                                         <TableHead>{t('email')}</TableHead>
                                         <TableHead>{t('message')}</TableHead>
                                         <TableHead className="text-right">{t('actions')}</TableHead>
                                     </TableRow>
                                 </TableHeader>
                                 <TableBody>
                                    {filteredSubmissions.map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-medium">{formatDate(sub.submittedAt)}</TableCell>
                                            <TableCell>{sub.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{sub.email}</TableCell>
                                            <TableCell className="text-muted-foreground max-w-xs truncate">{sub.message}</TableCell>
                                            <TableCell className="text-right">
                                                <SubmissionDetailsModal submission={sub} />
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setSubmissionToDelete({id: sub.id, name: sub.name})}>
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">{t('delete')}</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                 </TableBody>
                             </Table>
                         )}
                    </CardContent>
                </Card>
            </div>

            <AlertDialog open={!!submissionToDelete} onOpenChange={(isOpen) => !isOpen && setSubmissionToDelete(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('deleteSubmissionConfirmation', submissionToDelete?.name || '')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                    {t('delete')}
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
