export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar will go here */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
