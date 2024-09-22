import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default async function Layout({children}: {children: React.ReactNode}) {
  return (

      <div className="flex min-h-screen">
          <Sidebar />
          {children}
      </div>
  );
}
