import Image from "next/image";
import { Inter } from "next/font/google";
import { wrapper } from "@/app/store";
import {
  getCategoriesThunk,
  getProductByCategoryThunk,
  getProductsThunk,
} from "@/features/product/productAPI";
import {
  getCategories,
  getProducts,
  selectProduct,
} from "@/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { arr, catArr } = useAppSelector(selectProduct);
  console.log(arr, catArr);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3>Product</h3>
      <select
        name=""
        id=""
        onChange={async (e) => {
          const data = await dispatch(
            getProductByCategoryThunk(e.target.value)
          ).unwrap();
          console.log(data);
          dispatch(getProducts(data));
        }}
      >
        {catArr.map((elm, i) => (
          <option value={elm} key={i}>
            {elm}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Image</td>
            <td>Category</td>
            <td>See</td>
            <td>Del</td>
          </tr>
        </thead>
        <tbody>
          {arr.map((elm, i) => (
            <tr key={i}>
              <td>{elm.title}</td>
              <td>
                <img src={elm.image} alt="" width={"100px"} />
              </td>
              <td>{elm.category}</td>
              <td>
                <Link href={"/product/" + elm.id}>See</Link>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export const getStaticProps = wrapper.getStaticProps(
  (store): any =>
    async () => {
      const data = await store.dispatch(getProductsThunk()).unwrap();
      // console.log(data);
      const data1 = await store.dispatch(getCategoriesThunk()).unwrap();
      store.dispatch(getProducts(data));
      store.dispatch(getCategories(data1));
    }
);
console.log('welcome')
