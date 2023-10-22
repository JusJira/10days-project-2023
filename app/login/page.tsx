import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto lg:max-w-lg">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" placeholder="Enter username" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Password</Label>
                            <Input id="password" type="password" placeholder="Enter password" />
                        </div>
                        <div className="grid gap-2 text-center">
                            <Label className="mt-2 text-xs text-center mb-2">
                                Don't have an account?{" "}
                                <Link href="/register" className="text-indigo-600 hover:text-indigo-500">Create account</Link>
                            </Label>
                        </div>
                        
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="">Sign In</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}