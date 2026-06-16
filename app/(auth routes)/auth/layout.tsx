"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    router.refresh();
    startTransition(() => {
      setLoading(false);
    });
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}
