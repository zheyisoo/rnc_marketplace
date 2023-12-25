import Image from "next/image";
import Link from "next/link";
import { Item } from "@prisma/client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCard {
  data: Item;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  return (
      <div className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg">
        <Card className="rounded-lg border-2">
          <CardContent className="pt-4">
            <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
              <img
                src={data.imageUrls}
                alt=""
                className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start">
            <div>
              <p className="font-semibold text-lg">{data.name}</p>
              <p className="text-sm text-primary/80">{data.category}</p>
            </div>
            <div className="flex items-center justify-between">{data?.price}</div>
          </CardFooter>
        </Card>
      </div>
  );
};

export default ProductCard;
