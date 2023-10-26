"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/utils/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ProductSearchPanel = ({path} : {path : string}) => {
    const queryParams = useSearchParams();
    const [search, setSearch] = useState<string | null>(queryParams ? queryParams.get("q") : "");

    const router = useRouter();

    useDebounce(() => {
        if (!search) {
            router.push(`/${path}`)
        }
        else {
            router.push(`/${path}?q=${search}`)
        }
        
    }, [search], 500)


    return (
        <>
            <div className="bg-neutral-100 dark:bg-neutral-800 w-full py-5 px-8">
                <Input 
                    placeholder="Search product..."
                    value={search||""}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </>
    );
}

export default ProductSearchPanel