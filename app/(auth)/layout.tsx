import { requireUnAuth } from "@/features/auth/actions";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUnAuth(); //unAuth because if user is not signed-in then only he can see this sign-in page
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-between bg-muted/40 px-4 py-12">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
