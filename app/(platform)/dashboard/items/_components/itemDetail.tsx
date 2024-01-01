"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Item } from '@prisma/client';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import updateItemDetail from '@/action/updateItemDetail';
import { Category } from '@prisma/client';
import { useQRCode } from 'next-qrcode';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { CldUploadButton } from 'next-cloudinary';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '@/components/singleImageDropZone';
import { set } from 'zod';



interface ItemDetailProps {
    item: Item;
  }

const ItemDetail: React.FC<ItemDetailProps> = ({item}) => {
 
    const [items, setItems] = useState<Item>();
    const [isOpen, setIsOpen] = useState(true);
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [name, setName] = useState(items?.name || ''); // Use an empty string as a default value
    const [quantity, setQuantity] = useState(items?.quantity || 0);
    const [price, setPrice] = useState(items?.price || 0);
    const [category, setCategory] = useState<Category>(Category.FOOD);
    const [image, setImage] = useState<string>('');

    const { Canvas } = useQRCode();

    const handleSaveChanges = () => {
        console.log("run here???")
        // Access the updated values of name and quantity here
        console.log('Name:', name);
        console.log('Quantity:', quantity);
        console.log('Price:', price);
        console.log('image:', image)
        const item: Item = {
            id: items?.id || 0,
            name: name,
            price: price,
            quantity: quantity,
            category: items?.category || Category.FOOD,
            updatedAt: new Date(),
            createdAt: items?.createdAt || new Date(),
            imageUrls: image,
        };
        updateItemDetail(item);
        console.log("item", item)
        setIsOpen(false);
      };

    const initiateItem = () => {
        setName(item?.name || '')
        setQuantity(item?.quantity| 0)
        setPrice(item?.price || 0)
        setCategory(item?.category || Category.FOOD)
        setImage(item?.imageUrls || '')
    }

    const handleUpload = async () => {
        if (file) {
          try {
            setUploading(true);
    
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                setProgress(progress);
              },
            });
    
            // Assuming your response has a URL property
            setImage(res.url);
            console.log(res);
          } catch (error) {
            console.error('Error uploading file:', error);
          } finally {
            setUploading(false);
            setProgress(0);
          }
        }
      };
    
    useEffect(() => {
      console.log("itemList", item)
      setItems(item);
      setIsOpen(true)
      initiateItem()  
    }, [item]);

return (
    <div>
    <Dialog onOpenChange={()=>setIsOpen(false)} open = {isOpen} >
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Edit Item Details</DialogTitle>
            <DialogDescription>
            Make changes to the item here. Click save when you are done.
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
                Name
            </Label>
            <Input id="name" 
            onChange={(e) => setName(e.target.value)} 
            value={name} placeholder={items?.name} 
            className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
                Quantity
            </Label>
            <Input type="number" id="quantity" 
            onChange={(e) => setQuantity(parseInt(e.target.value))} 
            value={quantity} 
            placeholder={items?.quantity.toString()} 
            className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
                Price
            </Label>
            <Input type="number" id="price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder={item?.price.toString()}
            className="col-span-3"
            pattern="[0-9]*"            
            value={price}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
                Category
            </Label>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={item.category} />
                </SelectTrigger>
                <SelectContent>
                    {Object.values(Category).map((category) => (
                    <SelectItem value={category} key={category} onClick={() => setCategory(category as Category)}>
                        {category}
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            </div>
        </div>
        <div className='flex items-center justify-center'>
        <SingleImageDropzone
            width={50}
            height={50}
            value={file}
            onChange={(file) => {
            setFile(file);
            }}
        />
        </div>
        <div className='flex items-center justify-center'>
        <Button
            onClick={handleUpload}
            disabled={uploading}
        >
            {uploading ? `Uploading... ${progress}%` : 'Upload'}
        </Button>
        </div>
        <div className="flex items-center justify-center">
            <Canvas 
            text={JSON.stringify(item)}
            options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 2,
                width: 100,
                color: {
                dark: '#3F2B27',
                light: '#FFFFFF',
                },
            }}
            />
        </div>
        <div className="flex items-center justify-center">
            {<Button type="submit" onClick={() => handleSaveChanges()}>
                Save changes
            </Button>}
        </div>
        <DialogFooter>
        </DialogFooter>
        </DialogContent>
    </Dialog>
    <div className="flex items-center justify-center">
    </div>
    </div>
  );
};

export default ItemDetail;

