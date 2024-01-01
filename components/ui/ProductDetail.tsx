"use client"

import { useEffect, useState } from 'react';
import React, { useContext } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import addNewItem from '@/action/addNewItem';
import { Item } from '@prisma/client';
import { Category } from '@prisma/client';
import { useAuth,useUser } from "@clerk/nextjs";


import updateUserCart from '@/action/updateUserCart';


interface ItemDetailProps {
    item: Item;
    userId: string;
  }

const ProductDetail: React.FC<ItemDetailProps> = ({item,userId}) => { 
    const [name, setName] = useState(''); // Use an empty string as a default value
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState<Category>(Category.FOOD);
    const [dbUser, setdbUser] = useState<string>("");
    const {user} = useUser();


    const handleAddToCart = () => {
        updateUserCart(item, quantity,dbUser)
        setIsOpen(false);
    }

    useEffect(() => {
        if (user){
            setdbUser(user.id)
        }
        setIsOpen(true)
        // initiateItem()  
      }, [item]);

    return (
        <div>
            {/* <Button onClick ={()=>setIsOpen(true)} variant="outline">Add New Item</Button> */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add To Order</DialogTitle>
                <DialogDescription>
                
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className='flex justify-center items-center gap-4'>
                    <img
                        src={item?.imageUrls}
                        alt="Item Image"
                        style={{ width: '150px', height: '150px' }}
                    />       
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <div className="col-span-3" id="name">
                    {item?.name}
                </div>
                <Label htmlFor="price" className="text-right">
                    Price
                </Label>
                <div className="col-span-3" id="name">
                    RM {item?.price}
                </div>
                <Label htmlFor="price" className="text-right">
                    Stock 
                </Label>
                <div className="col-span-3" id="name">
                    {item?.quantity}
                </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                    Order Quantity
                </Label>
                <Input
                    type="number"
                    id="quantity"
                    onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    if (!isNaN(newValue) && newValue >= 0 && newValue <= item.quantity) {
                        setQuantity(newValue);
                    }
                    }}
                    value={quantity}
                    placeholder={'0'}
                    className="col-span-3"
                />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <Button type="submit" onClick={() => handleAddToCart()}>Add To Cart</Button>
            </div>
            {/* <DialogFooter>
            </DialogFooter> */}
            </DialogContent>
        </Dialog>
        </div>
    )
}

export default ProductDetail;