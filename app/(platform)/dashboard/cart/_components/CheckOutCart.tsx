"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Menu, Moon, ShoppingCart, Sun } from "lucide-react";
  import Link from "next/link";
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import { CartItem } from "@prisma/client";
  import { Item } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import checkOutCart from "@/action/checkOutCart";
import Category from "@prisma/client"

  interface CartProps {
    cart: CartItem[];
    itemList : Item[];
    userId: string;
  }

  const CheckOutCart: React.FC<CartProps> = ({cart,itemList,userId}) => {
 
    const [open, setOpen] = useState(true);
    const [quantity, setQuantity] = useState(0);

    const router = useRouter();

    const handleCheckOut = () => {
      console.log("handleCheckOut")
      checkOutCart(cart,userId);
    }

    const handleClose = () => {
      setOpen(false);
      router.push("/dashboard");
    }
    
    const mergeCartItemsWithItems = (cartItems: CartItem[], items: Item[]): (CartItem & { item: Item })[] => {
      return cartItems.map(cartItem => {
              const item = items.find(item => item.id === cartItem.itemId);

              // Ensure that item is always defined
              const mergedItem: Item = item || {
                id: -1, // Provide a default ID or use any other suitable default values
                name: '',
                price: 0,
                category: Category.$Enums.Category.FOOD, // Assuming you have a default category or use any other suitable default
                quantity: 0,
                imageUrls: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
      
            return {
                  ...cartItem,
                  item: mergedItem,
              };
          });
      };
  
    
    // Usage
    const mergedCartItems = mergeCartItemsWithItems(cart, itemList);
    const total = mergedCartItems.reduce((acc, item) => acc + item.quantity * item.item.price, 0);
    console.log("mergedCartItems",mergedCartItems);

    console.log("cart", cart)

    return(
        <Sheet open = {open} onOpenChange={()=> {handleClose()}}>
        <SheetContent side="right" className="w-[500px] sm:w-[700px]">
        <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
        Make changes to your profile here. Click save when you are done.
        </SheetDescription>
        </SheetHeader>
        <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {mergedCartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.item.name}</TableCell>
            <TableCell>            
              <Input type="number" id="quantity" 
              onChange={(e) => setQuantity(parseInt(e.target.value))} 
              value={item.quantity} 
              placeholder={item?.quantity.toString()} 
              className="col-span-3" />
              </TableCell>
              <TableCell className="text-right">{item.quantity * item.item.price}</TableCell>
            </TableRow> 
          ))}
            {/* {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
            ))} */}
        </TableBody>
        <TableFooter>
            <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">RM {total}</TableCell>
            </TableRow>
        </TableFooter>
        </Table>
        <div className="justify-center flex py-8">
          <Button onClick={()=>handleCheckOut()}>Checkout</Button>
        </div>
        </SheetContent>
    </Sheet>  
    )
  
  }

  export default CheckOutCart;