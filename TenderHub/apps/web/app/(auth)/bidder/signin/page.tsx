import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Sign in — bidder" };
export default function Page() { return <AuthForm kind="bidder" mode="signin" />; }
