import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Sign in — company" };
export default function Page() { return <AuthForm kind="company" mode="signin" />; }
