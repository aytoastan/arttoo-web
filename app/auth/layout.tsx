import { LoginFrame } from "@/components/loginFrame";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginFrame>{children}</LoginFrame>;
}
