'use client';

import { useState, useMemo } from 'react';
import { collection, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

function QuoteDetailsModal({ quote }: { quote: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Quote Request Details</DialogTitle>
                    <DialogDescription>
                        From {quote.contactName} at {quote.businessName}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-sm">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <p className="font-semibold">Contact Name:</p>
                        <p>{quote.contactName}</p>
                        <p className="font-semibold">Business Name:</p>
                        <p>{quote.businessName}</p>
                        <p className="font-semibold">Email:</p>
                        <p className="break-all">{quote.email}</p>
                        <p className="font-semibold">Phone:</p>
                        <p>{quote.phone || 'Not provided'}</p>
                        <p className="font-semibold">Submitted:</p>
                        <p>{quote.submittedAt ? format(quote.submittedAt.toDate(), 'PPP p') : 'N/A'}</p>
                    </div>
                    <hr className="my-2" />
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <p className="font-semibold">Service Needed:</p>
                        <p>{quote.serviceNeeded}</p>
                        <p className="font-semibold">Industry:</p>
                        <p>{quote.industry}</p>
                        <p className="font-semibold">Business Size:</p>
                        <p>{quote.businessSize}</p>
                        <p className="font-semibold">Timeline:</p>
                        <p>{quote.timeline}</p>
                        <p className="font-semibold">Budget:</p>
                        <p>{quote.budget}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default function QuoteRequestManagement() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [quoteToDelete, setQuoteToDelete] = useState<{id: string; name: string} | null>(null);
    const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted'>('all');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
    const [searchTerm, setSearchTerm] = useState('');


    const quotesQuery = useMemoFirebase(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'quote_requests'), orderBy('submittedAt', sortOrder));
    }, [firestore, sortOrder]);

    const { data: allQuotes, isLoading: isLoadingQuotes } = useCollection(quotesQuery);

    const filteredQuotes = useMemo(() => {
        if (!allQuotes) return [];
        
        return allQuotes.filter(quote => {
            const statusMatch = statusFilter === 'all' || quote.status === statusFilter;
            const searchMatch = !searchTerm || 
                                quote.contactName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                quote.businessName.toLowerCase().includes(searchTerm.toLowerCase());
            return statusMatch && searchMatch;
        });

    }, [allQuotes, statusFilter, searchTerm]);
    
    const confirmDelete = async () => {
        if (!quoteToDelete) return;
        try {
          await deleteDoc(doc(firestore, 'quote_requests', quoteToDelete.id));
          toast({ title: 'Quote Request Deleted', description: `Request from "${quoteToDelete.name}" has been removed.` });
        } catch (error) {
          toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the quote request.' });
          console.error("Error deleting quote request:", error);
        } finally {
          setQuoteToDelete(null);
        }
    };

    const handleStatusChange = async (quote: any, contacted: boolean) => {
      const docRef = doc(firestore, 'quote_requests', quote.id);
      const newStatus = contacted ? 'contacted' : 'new';
      try {
        await updateDoc(docRef, { status: newStatus });
        toast({ title: 'Status Updated', description: `Request from ${quote.contactName} marked as ${newStatus}.` });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not update the status.' });
        console.error("Error updating status:", error);
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
                             <CardTitle>Manage Quote Requests</CardTitle>
                             <CardDescription>
                                 View, filter, and manage quote requests submitted by potential clients.
                             </CardDescription>
                           </div>
                           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                               <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search by name or business..."
                                        className="pl-8 sm:w-[200px] lg:w-[300px]"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                               <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                                 <SelectTrigger className="w-full sm:w-[180px]">
                                   <SelectValue placeholder="Filter by status" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectItem value="all">All Statuses</SelectItem>
                                   <SelectItem value="new">New</SelectItem>
                                   <SelectItem value="contacted">Contacted</SelectItem>
                                 </SelectContent>
                               </Select>
                               <Button variant="outline" size="icon" onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}>
                                {sortOrder === 'desc' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                                <span className="sr-only">Toggle Sort Order</span>
                               </Button>
                           </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                         {isLoadingQuotes && <p className="text-center py-8">Loading quotes...</p>}
                         {!isLoadingQuotes && filteredQuotes && filteredQuotes.length === 0 && <p className="text-center text-muted-foreground py-8">No quote requests match the current filters.</p>}
                         {!isLoadingQuotes && filteredQuotes && filteredQuotes.length > 0 && (
                             <Table>
                                 <TableHeader>
                                     <TableRow>
                                         <TableHead className="w-[120px]">Status</TableHead>
                                         <TableHead>Date</TableHead>
                                         <TableHead>Contact Name</TableHead>
                                         <TableHead>Business</TableHead>
                                         <TableHead>Service Needed</TableHead>
                                         <TableHead className="text-right">Actions</TableHead>
                                     </TableRow>
                                 </TableHeader>
                                 <TableBody>
                                    {filteredQuotes.map((quote) => (
                                        <TableRow key={quote.id}>
                                            <TableCell>
                                              <div className="flex items-center space-x-2">
                                                <Switch
                                                  id={`status-${quote.id}`}
                                                  checked={quote.status === 'contacted'}
                                                  onCheckedChange={(checked) => handleStatusChange(quote, checked)}
                                                  aria-label="Toggle contacted status"
                                                />
                                                <Label 
                                                    htmlFor={`status-${quote.id}`}
                                                    className={cn(
                                                      "capitalize",
                                                      quote.status === 'contacted' ? 'text-green-600' : 'text-red-600'
                                                    )}
                                                >
                                                  {quote.status || 'new'}
                                                </Label>
                                              </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{formatDate(quote.submittedAt)}</TableCell>
                                            <TableCell>{quote.contactName}</TableCell>
                                            <TableCell className="text-muted-foreground">{quote.businessName}</TableCell>
                                            <TableCell className="text-muted-foreground">{quote.serviceNeeded}</TableCell>
                                            <TableCell className="text-right">
                                                <QuoteDetailsModal quote={quote} />
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setQuoteToDelete({id: quote.id, name: quote.contactName})}>
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
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

            <AlertDialog open={!!quoteToDelete} onOpenChange={(isOpen) => !isOpen && setQuoteToDelete(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the quote request from
                    <span className="font-semibold"> {quoteToDelete?.name}</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                    Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
