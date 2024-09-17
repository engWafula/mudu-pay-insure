import Sidebar from "../components/Sidebar";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <main className="flex-grow p-6">
            {children}
          </main>
        </div>
  );
}
