import { requireAuth } from "@/features/auth/actions";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth(); //only logged in user can see these pages

  return <div className="min-h-svh">{children}</div>;
}
