"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const handleTheme = (state: boolean) => {
    if (state) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => setLoading(false), []);

  if (!loading)
    return (
      <div className="flex h-10 w-2/3 flex-row items-center justify-between rounded-md border-[1px] border-black bg-white px-2 shadow-2xl dark:bg-black lg:w-48">
        <span className="sr-only">Dark mode toggle</span>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Label htmlFor="dark-mode">
          {theme == "dark" ? "Dark Mode" : "Light Mode"}
        </Label>
        <Switch
          id="dark-mode"
          checked={theme == "dark"}
          onCheckedChange={(state) => handleTheme(state)}
        />
      </div>
    );
  else return <div className="h-10 w-2/3"></div>;
}
