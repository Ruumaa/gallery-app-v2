'use client';
import { displayProduct } from '@/lib/fetch';

const Page = () => {
  const { useProducts, uploadProduct, deleteProduct } = displayProduct();
  const { products, isLoading } = useProducts();
  const handleUpload = async () => {
    const product = { title: 'Product 1', desc: 'Product 1 description' };
    await uploadProduct(product);
  };
  return (
    <>
      <div className="w-full grid grid-cols-3 gap-3">
        {products?.data.map((product) => (
          <div className="card w-full bg-base-100 shadow-xl" key={product.id}>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.desc}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divider">
        <button className="btn btn-primary btn-sm" onClick={handleUpload}>
          Add Product
        </button>
      </div>
    </>
  );
};

export default Page;
