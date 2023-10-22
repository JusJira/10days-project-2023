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
import { ThemeProvider } from "@/components/Theme-provider";


export default function Register() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto lg:max-w-lg">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Register</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" placeholder="Enter username" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Display Name</Label>
                            <Input id="displayName" type="text" placeholder="Enter your display name" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Password</Label>
                            <Input id="password" type="password" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[A-za-z\d]{8,}" placeholder="Enter password" 
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" placeholder="Type your password again" />
                        </div>
                        
                        
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="">Next</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
        </ThemeProvider>
    )
}