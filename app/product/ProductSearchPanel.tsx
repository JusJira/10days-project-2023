"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebounce from "@/utils/useDebounce";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const ProductSearchPanel = ({ path }: { path: string }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [randoming, setRandoming] = useState(false);

  const queryParams = useSearchParams();
  const [search, setSearch] = useState<string | null>(
    queryParams ? queryParams.get("q") : ""
  );
  const [startPrice, setStartPrice] = useState<number>(
    queryParams ? Number(queryParams.get("startprice")) : 0
  );
  const [endPrice, setEndPrice] = useState<number>(
    queryParams ? Number(queryParams.get("endprice")) : 0
  );

  const [sortMode, setSortMode] = useState<string>("Default");

  const router = useRouter();

  useDebounce(
    () => {
      let queryArray: Array<string> = [];

      if (search) {
        queryArray.push(`q=${search}`);
      }
      if (startPrice != 0) {
        queryArray.push(`startprice=${startPrice}`);
      }
      if (endPrice != 0) {
        queryArray.push(`endprice=${endPrice}`);
      }

      if (sortMode == "Name : Ascending") {
        queryArray.push(`sort=nameasc`);
      } else if (sortMode == "Name : Descending") {
        queryArray.push(`sort=namedes`);
      } else if (sortMode == "Price : Ascending") {
        queryArray.push(`sort=priceasc`);
      } else if (sortMode == "Price : Descending") {
        queryArray.push(`sort=pricedes`);
      }

      router.push(
        `/${path}` + (queryArray.length != 0) && "?" + queryArray.join("&"),
        { scroll: false }
      );
    },
    [search, startPrice, endPrice, sortMode],
    500
  );

  const onRandom = async () => {
    setRandoming(true);
    const url = await fetch("/api/product/random");
    if (url.ok) {
      const data = await url.json();
    //   console.log(data)
      window.location.href = data
      setRandoming(false);
    }
  };

  return (
    <>
      <div className="bg-neutral-100 dark:bg-neutral-800 w-full py-5 px-8 space-y-2">
        <div className="flex flex-row content-center space-x-4">
          <div className="grid content-center">
            <Label>Name</Label>
          </div>
          <Input
            placeholder="Search product..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-row content-center space-x-4">
          <div className="grid content-center">
            <Label>Price</Label>
          </div>

          <Input
            placeholder="0"
            type="number"
            className="w-36"
            value={startPrice || ""}
            onChange={(e) => setStartPrice(Math.max(0, Number(e.target.value)))}
          />
          <div className="grid content-center">
            <Label>to</Label>
          </div>
          <Input
            placeholder="infinity"
            type="number"
            className="w-36"
            value={endPrice || ""}
            onChange={(e) => setEndPrice(Math.max(0, Number(e.target.value)))}
          />
        </div>
        <div className="flex flex-row content-center space-x-4">
          <div className="grid content-center">
            <Label>Filter</Label>
          </div>

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-56">
                {sortMode}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Button
                className={`w-full ${
                  sortMode == "Default" ? " bg-muted/60" : ""
                }`}
                variant="ghost"
                onClick={() => {
                  setSortMode("Default");
                  setCalendarOpen(false);
                }}
              >
                Default
              </Button>

              <div className="pt-2">
                <Label>Name</Label>
                <Separator />
              </div>
              <Button
                className={`w-full ${
                  sortMode == "Name : Ascending" ? " bg-muted/60" : ""
                }`}
                variant="ghost"
                onClick={() => {
                  setSortMode("Name : Ascending");
                  setCalendarOpen(false);
                }}
              >
                Ascending
              </Button>
              <Button
                className={`w-full ${
                  sortMode == "Name : Descending" ? " bg-muted/60" : ""
                }`}
                variant="ghost"
                onClick={() => {
                  setSortMode("Name : Descending");
                  setCalendarOpen(false);
                }}
              >
                Descending
              </Button>

              <div className="pt-2">
                <Label>Price</Label>
                <Separator />
              </div>
              <Button
                className={`w-full ${
                  sortMode == "Price : Ascending" ? " bg-muted/60" : ""
                }`}
                variant="ghost"
                onClick={() => {
                  setSortMode("Price : Ascending");
                  setCalendarOpen(false);
                }}
              >
                Ascending
              </Button>
              <Button
                className={`w-full ${
                  sortMode == "Price : Descending" ? " bg-muted/60" : ""
                }`}
                variant="ghost"
                onClick={() => {
                  setSortMode("Price : Descending");
                  setCalendarOpen(false);
                }}
              >
                Descending
              </Button>
            </PopoverContent>
          </Popover>
          <div className="grid content-center">
            <Button
              variant="outline"
              onClick={() => onRandom()}
              disabled={randoming}
            >
              Im Feeling Lucky
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSearchPanel;
