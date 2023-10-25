import { useAppSelector } from "@/app/hooks";
import { wrapper } from "@/app/store";
import { getProductByIdThunk } from "@/features/product/productAPI";
import { getProductById, selectProduct } from "@/features/product/productSlice";

export default function SeeProd() {
  const { product } = useAppSelector(selectProduct);
  console.log(product);
  return (
    <div>
      <h3>SeeProd</h3>
      <p>{product.id}</p>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <p>{product.category}</p>
      <p>
        <img src={product.image} alt="" width={'150px'} />
      </p>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store): any =>
    async ({ params }: any) => {
      const data = await store
        .dispatch(getProductByIdThunk(params.id))
        .unwrap();
      store.dispatch(getProductById(data));
    }
);
