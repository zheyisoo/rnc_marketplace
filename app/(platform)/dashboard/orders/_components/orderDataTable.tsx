import { DataTable } from "../../../../../components/dataTable";
import { OrdersTable } from "@/lib/type";
import columns from "./columns";

type ItemsPageProps = {
  itemList: OrdersTable[];
};

export const OrderDataTable = ({ itemList }: ItemsPageProps) => {

  return (
    <div>
      <DataTable columns={columns} data={itemList} />
    </div>
  );
};

export default OrderDataTable;
