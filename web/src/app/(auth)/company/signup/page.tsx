import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Create an account — company" };
export default function Page() { return <AuthForm kind="company" mode="signup" />; }
