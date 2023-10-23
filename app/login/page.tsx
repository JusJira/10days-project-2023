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
import { GoogleLogo } from "@/components/icons/GoogleLogo";

export default function Login() {
    return (

        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto lg:max-w-lg">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Email</Label>
                                <Input id="username" type="email" placeholder="Enter email address" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Password</Label>
                                <Input id="password" type="password" placeholder="Enter password" />
                            </div>
                            <div className="flex items-center justify-center">
                                <Input id="checked-checkbox" type = 'checkbox' className ="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <Label htmlFor ="checked-checkbox" className ="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">Remember me</Label>
                            </div>
                            <div className="grid gap-2 text-center">
                                <Label className="mt-2 text-xs text-center mb-2">
                                    Don't have an account?{" "}
                                    <Link href="/register" className="text-indigo-600 hover:text-indigo-500">Create account</Link>
                                </Label>
                            </div>
                            <div className="grid grid-cols-6">
                                <Button className="col-start-2 col-end-6">Sign In</Button>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-6">
                            <Button variant="outline" className="col-start-2 col-end-6">
                                <GoogleLogo />
                                <span className="pl-3">Google</span>
                            </Button>
                        </div>


                        </CardContent>
                    </Card>
                
                
            </div>
        </div>

    )
}