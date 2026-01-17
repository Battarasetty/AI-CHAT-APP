import Sidebar from "@/components/Sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
