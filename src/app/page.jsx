import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/data";
import Link from 'next/link';

export default async function Home() {
  const products = await getProducts();
  const session = await auth();

  return (
    <>
      <div className="flex justify-center space-x-2 rounded h-200">
        {products.map((product, index) => {
          return (
            <div className="h-221 w-136 flex flex-col justify-center items-center mt-30 border rounded-md border-black" key={index}>
              <img src={product.imageUrl} width="200px" alt="" />
              <h3 className="font-bold mx-6">{product.Brand}</h3>
              <p className="font-bold mx-7">{product.estimatedPrice}</p>
              <Link href={session.user.name ? '/cart' : '/login'}>
                <button>
                  Buy Product
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
