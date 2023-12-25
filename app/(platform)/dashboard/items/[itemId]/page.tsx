import React, { useEffect } from 'react';
import { db } from '@/lib/db';
  
const ItemsPage = async () => {

    const items = await db.item.findMany()


    return (
    <div className='flex-col'>
        {/* <div className="flex">
            <div className="flex-grow">
            </div>
            <div className='pr-8'>
                <AddNewItem/>
            </div>
      </div>
      <div className='px-20 py-8'>
        <ItemList itemList={items}/>
      </div> */}
    </div>
    );
  };
  
export default ItemsPage;
