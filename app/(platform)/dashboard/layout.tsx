import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ 
  children
}: { 
  children: React.ReactNode;
 }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-20 md:pt-24">
        <div className="flex">
          <div className="w-52 hidden md:block">
            <Sidebar />
          </div>
          <div className="w-full h-full">
            {children}
          </div>
        </div>
      </div>
      {/* {children} */}
    </div>
  );
 };

 export default DashboardLayout;