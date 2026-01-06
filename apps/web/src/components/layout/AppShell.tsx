import SidebarNav from "./SidebarNav";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="relative z-10 flex min-h-screen flex-col">
        <SidebarNav />
        <main className="flex-1 px-6 py-8 md:px-10 md:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
