import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5"> {/* 1/5 represents 20% width */}
        <Sidebar />
      </div>
      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
