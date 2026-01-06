'use client';
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ImageUpload } from '@/components/ui/image-upload';
import { Plus, Trash2 } from 'lucide-react';

export default function PersonalBrandingManagement({ onBack }: { onBack: () => void }) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const pageDocRef = useMemoFirebase(() => doc(firestore, 'personal_branding_pages', 'main'), [firestore]);
    const { data: pageData, isLoading } = useDoc(pageDocRef);

    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (pageData) {
            setFormData(pageData);
        } else {
            // Set default structure if no data exists
            setFormData({
                hero: { title: "", subtitle: "", ctaButtonText: "", backgroundImageUrl: "", logoSvg: "", logoSize: 96},
                team: { title: "", backgroundImage: "", professions: [] },
                problem: { title: "", mainPoint: "", listItems: [], howToTitle: "", howToListItems: [], question: "", ctaButtonText: ""},
                expertise: { title: "", subtitle: "", backgroundImageUrl: ""},
                benefits: { title: "", mainBenefits: [], sideBenefitsTitle: "", sideBenefitsImage: "", sideBenefitsItems: [], conclusion: "", ctaButtonText: "" },
                results: { title: "", withoutTitle: "", withoutItems: [], withoutImage: "", withTitle: "", withItems: [], withImage: "", bonus: "", ctaButtonText: ""},
                method: { title: "", steps: [], ctaButtonText: "" },
                finalCta: { title: "", subtitle: "", backgroundImageUrl: "" }
            });
        }
    }, [pageData]);

    const handleSave = async () => {
        try {
            await setDoc(pageDocRef, formData, { merge: true });
            toast({ title: 'Page Saved', description: 'Personal Branding page content has been updated.' });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not save the page content.' });
        }
    };
    
    const handleFieldChange = (section: string, field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };
    
    const handleListItemChange = (section: string, listName: string, index: number, value: string) => {
        const newList = [...(formData[section]?.[listName] || [])];
        newList[index] = value;
        handleFieldChange(section, listName, newList);
    };

    const handleAddListItem = (section: string, listName: string) => {
        const newList = [...(formData[section]?.[listName] || []), ""];
        handleFieldChange(section, listName, newList);
    };
    
    const handleRemoveListItem = (section: string, listName: string, index: number) => {
        const newList = [...(formData[section]?.[listName] || [])];
        newList.splice(index, 1);
        handleFieldChange(section, listName, newList);
    };
    
    const handleObjectInListChange = (section: string, listName: string, index: number, field: string, value: any) => {
        const newList = [...(formData[section]?.[listName] || [])];
        newList[index] = {...newList[index], [field]: value};
        handleFieldChange(section, listName, newList);
    };
    
    const handleAddObjectInList = (section: string, listName: string, defaultObject: any) => {
        const newList = [...(formData[section]?.[listName] || []), defaultObject];
        handleFieldChange(section, listName, newList);
    };

    if (isLoading) return <p>Loading page content...</p>;

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
            <div className="flex justify-between items-center">
                 <Button onClick={onBack} variant="outline">Back to Coded Pages</Button>
                 <Button onClick={handleSave}>Save Page</Button>
            </div>
           
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                {/* Hero Section */}
                <AccordionItem value="item-1">
                    <AccordionTrigger>Hero Section</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <ImageUpload label="Background Image" value={formData.hero?.backgroundImageUrl} onChange={(url) => handleFieldChange('hero', 'backgroundImageUrl', url)} />
                        <div className="grid gap-2">
                            <Label>Logo SVG Code</Label>
                            <Textarea 
                                value={formData.hero?.logoSvg} 
                                onChange={(e) => handleFieldChange('hero', 'logoSvg', e.target.value)} 
                                placeholder="<svg>...</svg>"
                                className="h-32 font-mono"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Logo Size (in pixels)</Label>
                            <Input 
                                type="number"
                                value={formData.hero?.logoSize} 
                                onChange={(e) => handleFieldChange('hero', 'logoSize', Number(e.target.value))} 
                                placeholder="e.g., 96"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input value={formData.hero?.title} onChange={(e) => handleFieldChange('hero', 'title', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Subtitle</Label>
                            <Textarea value={formData.hero?.subtitle} onChange={(e) => handleFieldChange('hero', 'subtitle', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA Button Text</Label>
                            <Input value={formData.hero?.ctaButtonText} onChange={(e) => handleFieldChange('hero', 'ctaButtonText', e.target.value)} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                {/* Professions Section */}
                <AccordionItem value="item-2">
                    <AccordionTrigger>Professions Section</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                         <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input value={formData.team?.title} onChange={(e) => handleFieldChange('team', 'title', e.target.value)} />
                        </div>
                        <ImageUpload label="Background Image" value={formData.team?.backgroundImageUrl} onChange={(url) => handleFieldChange('team', 'backgroundImageUrl', url)} />
                        <Label>Professions</Label>
                        <Accordion type="multiple" className="space-y-2">
                        {(formData.team?.professions || []).map((prof: any, index: number) => (
                             <AccordionItem key={index} value={`prof-${index}`} className="border rounded-md px-4 bg-background">
                                <AccordionTrigger>{prof.name || `Profession ${index + 1}`}</AccordionTrigger>
                                <AccordionContent className="pt-4 space-y-4">
                                    <ImageUpload label={`Image ${index+1}`} value={prof.image} onChange={(url) => handleObjectInListChange('team', 'professions', index, 'image', url)} />
                                    <Input placeholder="Name" value={prof.name} onChange={(e) => handleObjectInListChange('team', 'professions', index, 'name', e.target.value)} />
                                    <div className="text-right">
                                         <Button size="icon" variant="destructive" onClick={() => handleRemoveListItem('team', 'professions', index)}><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                        <Button variant="outline" onClick={() => handleAddObjectInList('team', 'professions', { name: "", image: "" })}><Plus className="w-4 h-4 mr-2" /> Add Profession</Button>
                    </AccordionContent>
                </AccordionItem>

                 {/* Problem Section */}
                <AccordionItem value="item-3">
                    <AccordionTrigger>Problem Section</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input value={formData.problem?.title} onChange={(e) => handleFieldChange('problem', 'title', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Main Point</Label>
                            <Input value={formData.problem?.mainPoint} onChange={(e) => handleFieldChange('problem', 'mainPoint', e.target.value)} />
                        </div>
                        <Label>List Items</Label>
                        {(formData.problem?.listItems || []).map((item: string, index: number) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Input value={item} onChange={(e) => handleListItemChange('problem', 'listItems', index, e.target.value)} />
                                <Button size="icon" variant="destructive" onClick={() => handleRemoveListItem('problem', 'listItems', index)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        ))}
                        <Button variant="outline" onClick={() => handleAddListItem('problem', 'listItems')}><Plus className="w-4 h-4 mr-2" />Add List Item</Button>

                         <div className="grid gap-2">
                            <Label>How-to Title</Label>
                            <Input value={formData.problem?.howToTitle} onChange={(e) => handleFieldChange('problem', 'howToTitle', e.target.value)} />
                        </div>
                         <Label>How-to List Items</Label>
                        {(formData.problem?.howToListItems || []).map((item: string, index: number) => (
                             <div key={index} className="flex gap-2 items-center">
                                <Input value={item} onChange={(e) => handleListItemChange('problem', 'howToListItems', index, e.target.value)} />
                                <Button size="icon" variant="destructive" onClick={() => handleRemoveListItem('problem', 'howToListItems', index)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        ))}
                        <Button variant="outline" onClick={() => handleAddListItem('problem', 'howToListItems')}><Plus className="w-4 h-4 mr-2" />Add How-to Item</Button>

                        <div className="grid gap-2">
                            <Label>Question</Label>
                            <Input value={formData.problem?.question} onChange={(e) => handleFieldChange('problem', 'question', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA Button Text</Label>
                            <Input value={formData.problem?.ctaButtonText} onChange={(e) => handleFieldChange('problem', 'ctaButtonText', e.target.value)} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                 {/* Expertise Section */}
                <AccordionItem value="item-expertise">
                    <AccordionTrigger>Expertise Section</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <ImageUpload label="Background Image" value={formData.expertise?.backgroundImageUrl} onChange={(url) => handleFieldChange('expertise', 'backgroundImageUrl', url)} />
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input value={formData.expertise?.title} onChange={(e) => handleFieldChange('expertise', 'title', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Subtitle</Label>
                            <Input value={formData.expertise?.subtitle} onChange={(e) => handleFieldChange('expertise', 'subtitle', e.target.value)} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                 {/* Method Section */}
                <AccordionItem value="item-method">
                    <AccordionTrigger>Method Section</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input value={formData.method?.title} onChange={(e) => handleFieldChange('method', 'title', e.target.value)} />
                        </div>
                        <Label>Steps</Label>
                        {(formData.method?.steps || []).map((step: any, index: number) => (
                             <div key={index} className="flex flex-col gap-2 border p-4 rounded-md">
                                <Input placeholder="Step Title" value={step.title} onChange={(e) => handleObjectInListChange('method', 'steps', index, 'title', e.target.value)} />
                                <Textarea placeholder="Step Description" value={step.description} onChange={(e) => handleObjectInListChange('method', 'steps', index, 'description', e.target.value)} />
                                <Button size="sm" variant="destructive" className="self-end" onClick={() => handleRemoveListItem('method', 'steps', index)}><Trash2 className="w-4 h-4 mr-2" /> Remove Step</Button>
                            </div>
                        ))}
                        <Button variant="outline" onClick={() => handleAddObjectInList('method', 'steps', { title: "", description: "" })}><Plus className="w-4 h-4 mr-2" /> Add Step</Button>
                        <div className="grid gap-2">
                            <Label>CTA Button Text</Label>
                            <Input value={formData.method?.ctaButtonText} onChange={(e) => handleFieldChange('method', 'ctaButtonText', e.target.value)} />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                 {/* Add more accordions for other sections here in a similar fashion... */}
                 
            </Accordion>
            <div className="text-right mt-4">
                 <Button onClick={handleSave}>Save Page</Button>
            </div>
        </div>
    );
}
