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
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { IconSelect } from '@/components/ui/icon-select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
                beneficiaries: { title: "", items: [] },
                results: { title: "", withoutTitle: "", withoutItems: [], withoutImage: "", withTitle: "", withItems: [], withImage: "", bonus: "", ctaButtonText: ""},
                method: { conclusion: "", ctaButtonText: "", steps: [] },
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
        setFormData((prevData: any) => {
            const newData = { ...prevData };
            const newList = [...(newData[section]?.[listName] || [])];
            newList[index] = { ...newList[index], [field]: value };
            newData[section] = { ...newData[section], [listName]: newList };
            return newData;
        });
    };
    
    const handleAddObjectInList = (section: string, listName: string, defaultObject: any) => {
        const newList = [...(formData[section]?.[listName] || []), defaultObject];
        handleFieldChange(section, listName, newList);
    };
    
    const handleSubStepChange = (stepIndex: number, subStepIndex: number, field: 'name' | 'iconName', value: string) => {
        setFormData((prevData: any) => {
            const newData = { ...prevData };
            const steps = [...(newData.method?.steps || [])];
            const subSteps = [...(steps[stepIndex]?.subSteps || [])];
            subSteps[subStepIndex] = { ...subSteps[subStepIndex], [field]: value };
            steps[stepIndex] = { ...steps[stepIndex], subSteps: subSteps };
            newData.method = { ...newData.method, steps: steps };
            return newData;
        });
    };

    const handleAddSubStep = (stepIndex: number) => {
        setFormData((prevData: any) => {
            const newData = { ...prevData };
            const steps = [...(newData.method?.steps || [])];
            const subSteps = [...(steps[stepIndex]?.subSteps || []), { name: "", iconName: "PenTool" }];
            steps[stepIndex] = { ...steps[stepIndex], subSteps: subSteps };
            newData.method = { ...newData.method, steps: steps };
            return newData;
        });
    };

    const handleRemoveSubStep = (stepIndex: number, subStepIndex: number) => {
        setFormData((prevData: any) => {
            const newData = { ...prevData };
            const steps = [...(newData.method?.steps || [])];
            const subSteps = [...(steps[stepIndex]?.subSteps || [])];
            subSteps.splice(subStepIndex, 1);
            steps[stepIndex] = { ...steps[stepIndex], subSteps: subSteps };
            newData.method = { ...newData.method, steps: steps };
            return newData;
        });
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
                        <div className="space-y-2">
                        {(formData.team?.professions || []).map((prof: any, index: number) => (
                             <Collapsible key={index} asChild>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between p-4">
                                        <CollapsibleTrigger asChild>
                                            <button className="flex-1 text-left flex items-center justify-between">
                                                <CardTitle className="text-base">{prof.name || `Profession ${index + 1}`}</CardTitle>
                                                <ChevronDown className="h-4 w-4" />
                                            </button>
                                        </CollapsibleTrigger>
                                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleRemoveListItem('team', 'professions', index)}><Trash2 className="w-4 h-4" /></Button>
                                    </CardHeader>
                                    <CollapsibleContent>
                                        <CardContent className="pt-0 p-4 space-y-4">
                                            <ImageUpload label={`Image ${index+1}`} value={prof.image} onChange={(url) => handleObjectInListChange('team', 'professions', index, 'image', url)} />
                                            <Input placeholder="Name" value={prof.name} onChange={(e) => handleObjectInListChange('team', 'professions', index, 'name', e.target.value)} />
                                        </CardContent>
                                    </CollapsibleContent>
                                </Card>
                            </Collapsible>
                        ))}
                        </div>
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
                    <AccordionTrigger>Section Méthode</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <Label>Étapes</Label>
                        <div className="space-y-2">
                           {(formData.method?.steps || []).map((step: any, index: number) => (
                               <Card key={index} className="overflow-visible">
                                   <Collapsible>
                                       <CollapsibleTrigger asChild>
                                           <div className="flex items-center justify-between p-4 cursor-pointer">
                                                <CardTitle className="text-base">{step.title || `Étape ${index + 1}`}</CardTitle>
                                                <ChevronDown className="h-4 w-4" />
                                           </div>
                                       </CollapsibleTrigger>
                                       <CollapsibleContent>
                                           <CardContent className="pt-0 p-4 space-y-4">
                                               <Input placeholder="Titre de l'étape" value={step.title} onChange={(e) => handleObjectInListChange('method', 'steps', index, 'title', e.target.value)} />
                                               <Textarea placeholder="Description de l'étape" value={step.description} onChange={(e) => handleObjectInListChange('method', 'steps', index, 'description', e.target.value)} />
                                               <ImageUpload label="Image (optionnel pour étape 1 & 2)" value={step.imageUrl} onChange={(url) => handleObjectInListChange('method', 'steps', index, 'imageUrl', url)} />
                                               
                                               <Label>Sous-étapes (pour l'étape 3)</Label>
                                               {(step.subSteps || []).map((subStep: any, subIndex: number) => (
                                                   <div key={subIndex} className="flex gap-2 items-center border-t pt-2">
                                                       <IconSelect value={subStep.iconName} onChange={(val) => handleSubStepChange(index, subIndex, 'iconName', val)} />
                                                       <Input placeholder="Nom de la sous-étape" value={subStep.name} onChange={(e) => handleSubStepChange(index, subIndex, 'name', e.target.value)} />
                                                       <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleRemoveSubStep(index, subIndex)}>
                                                           <Trash2 className="w-4 h-4" />
                                                       </Button>
                                                   </div>
                                               ))}
                                               <Button variant="outline" size="sm" onClick={() => handleAddSubStep(index)}>
                                                   <Plus className="w-4 h-4 mr-2" /> Ajouter une sous-étape
                                               </Button>
                                           </CardContent>
                                       </CollapsibleContent>
                                   </Collapsible>
                                   <div className="flex justify-end p-2">
                                        <Button size="sm" variant="destructive" onClick={() => handleRemoveListItem('method', 'steps', index)}>Supprimer l'étape</Button>
                                   </div>
                               </Card>
                           ))}
                       </div>
                       <Button variant="outline" onClick={() => handleAddObjectInList('method', 'steps', { title: "", description: "", imageUrl: "", subSteps: [] })}><Plus className="w-4 h-4 mr-2" /> Ajouter une étape</Button>
                       <div className="grid gap-2 pt-4 border-t">
                            <Label>Texte de conclusion</Label>
                            <Input value={formData.method?.conclusion} onChange={(e) => handleFieldChange('method', 'conclusion', e.target.value)} />
                        </div>
                       <div className="grid gap-2">
                           <Label>Texte du bouton CTA</Label>
                           <Input value={formData.method?.ctaButtonText} onChange={(e) => handleFieldChange('method', 'ctaButtonText', e.target.value)} />
                       </div>
                    </AccordionContent>
                </AccordionItem>

                 {/* Results Section */}
                <AccordionItem value="item-results">
                    <AccordionTrigger>Results Section</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input value={formData.results?.title} onChange={(e) => handleFieldChange('results', 'title', e.target.value)} />
                        </div>

                        <Card className="p-4">
                            <Label className="font-bold">"Before" Column</Label>
                            <div className="grid gap-2 mt-2">
                                <Label>Title</Label>
                                <Input value={formData.results?.withoutTitle} onChange={(e) => handleFieldChange('results', 'withoutTitle', e.target.value)} />
                            </div>
                            <div className="grid gap-2 mt-2">
                                <Label>List Items</Label>
                                {(formData.results?.withoutItems || []).map((item: string, index: number) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <Input value={item} onChange={(e) => handleListItemChange('results', 'withoutItems', index, e.target.value)} />
                                        <Button size="icon" variant="destructive" onClick={() => handleRemoveListItem('results', 'withoutItems', index)}><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                ))}
                                <Button variant="outline" onClick={() => handleAddListItem('results', 'withoutItems')}><Plus className="w-4 h-4 mr-2" />Add Item</Button>
                            </div>
                            <ImageUpload label="Image" value={formData.results?.withoutImage} onChange={(url) => handleFieldChange('results', 'withoutImage', url)} />
                        </Card>
                        
                        <Card className="p-4">
                             <Label className="font-bold">"After" Column</Label>
                             <div className="grid gap-2 mt-2">
                                <Label>Title</Label>
                                <Input value={formData.results?.withTitle} onChange={(e) => handleFieldChange('results', 'withTitle', e.target.value)} />
                            </div>
                             <div className="grid gap-2 mt-2">
                                <Label>List Items</Label>
                                {(formData.results?.withItems || []).map((item: string, index: number) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <Input value={item} onChange={(e) => handleListItemChange('results', 'withItems', index, e.target.value)} />
                                        <Button size="icon" variant="destructive" onClick={() => handleRemoveListItem('results', 'withItems', index)}><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                ))}
                                <Button variant="outline" onClick={() => handleAddListItem('results', 'withItems')}><Plus className="w-4 h-4 mr-2" />Add Item</Button>
                            </div>
                             <ImageUpload label="Image" value={formData.results?.withImage} onChange={(url) => handleFieldChange('results', 'withImage', url)} />
                        </Card>

                        <div className="grid gap-2">
                            <Label>Bonus Text</Label>
                            <Input value={formData.results?.bonus} onChange={(e) => handleFieldChange('results', 'bonus', e.target.value)} />
                        </div>
                         <div className="grid gap-2">
                            <Label>CTA Button Text</Label>
                            <Input value={formData.results?.ctaButtonText} onChange={(e) => handleFieldChange('results', 'ctaButtonText', e.target.value)} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                 {/* Benefits Section */}
                <AccordionItem value="item-benefits">
                    <AccordionTrigger>Benefits Section</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        {/* Fields for Benefits section */}
                    </AccordionContent>
                </AccordionItem>

                 {/* Beneficiaries Section */}
                <AccordionItem value="item-beneficiaries">
                    <AccordionTrigger>Beneficiaries Section</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input value={formData.beneficiaries?.title} onChange={(e) => handleFieldChange('beneficiaries', 'title', e.target.value)} />
                        </div>
                        <Label>Items</Label>
                        {(formData.beneficiaries?.items || []).map((item: any, index: number) => (
                            <Card key={index} className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">Item {index + 1}</h4>
                                <Button size="icon" variant="destructive" onClick={() => handleRemoveListItem('beneficiaries', 'items', index)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                                <div className="space-y-4">
                                    <Input placeholder="Name (e.g., Dentistes)" value={item.name} onChange={(e) => handleObjectInListChange('beneficiaries', 'items', index, 'name', e.target.value)} />
                                    <Textarea placeholder="Description" value={item.description} onChange={(e) => handleObjectInListChange('beneficiaries', 'items', index, 'description', e.target.value)} />
                                    <ImageUpload label="Image" value={item.imageUrl} onChange={(url) => handleObjectInListChange('beneficiaries', 'items', index, 'imageUrl', url)} />
                                </div>
                            </Card>
                        ))}
                        <Button variant="outline" onClick={() => handleAddObjectInList('beneficiaries', 'items', { name: "", description: "", imageUrl: "" })}><Plus className="w-4 h-4 mr-2" /> Add Beneficiary</Button>
                    </AccordionContent>
                </AccordionItem>
                 
            </Accordion>
            <div className="text-right mt-4">
                 <Button onClick={handleSave}>Save Page</Button>
            </div>
        </div>
    );
}
