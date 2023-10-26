import ProductList from "../../components/ProductList";
import ProductSearchPanel from "./ProductSearchPanel";

export default function ProductPanel({path} : {path : string}) {

    return (
        <>
            <ProductSearchPanel path={path}/>
            <ProductList />
        </>
    );
}