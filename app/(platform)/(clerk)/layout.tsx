const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="pt-80 h-full flex items-center">
        <div className="mx-auto">{children}</div>
      </div>
    );
  };
  
  export default DashboardLayout;
  