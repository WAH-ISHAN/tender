import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Create an account — bidder" };
export default function Page() { return <AuthForm kind="bidder" mode="signup" />; }
