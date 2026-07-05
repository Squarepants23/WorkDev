type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return <div className="min-h-screen bg-gray-100">
    {children}</div>;
}

export default MainLayout;
