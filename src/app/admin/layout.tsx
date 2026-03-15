import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="admin-theme flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8 min-h-screen bg-zinc-950">{children}</main>
    </div>
  );
}
