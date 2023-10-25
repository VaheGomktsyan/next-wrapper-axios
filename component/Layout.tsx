import Link from "next/link";

export const Layout=({children}:any)=>{
    return (
        <div>
            <ul>
                <li><Link href={'/'}>Products</Link></li>
                <li><Link href={'/addproduct'}>Add Product</Link></li>
                <li><Link href={'/category'}>Categories</Link></li>
            </ul>
            <div>
                {children}
            </div>
        </div>
    )
}