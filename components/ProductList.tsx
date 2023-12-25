"use client"

import ProductCard from "@/components/ui/ProductCard";
import ProductDetail from "./ui/ProductDetail";
import { Item } from "@prisma/client";
import { useState } from "react";

interface ProductListProps {
  items: Item[];
  userId : string;
}

const ProductList: React.FC<ProductListProps> = ({ items,userId }) => {

  const [selectedItem, setSelectedItem] = useState<Item>(items[0]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div onClick={() => {setSelectedItem(item)}}>
            <ProductCard key={item.imageUrls + "_uniqueSuffix"} data={item} />
          </div>
        ))}
        <ProductDetail item={selectedItem} userId={userId}/>
      </div>  
    </div>
  );
};

export default ProductList;
