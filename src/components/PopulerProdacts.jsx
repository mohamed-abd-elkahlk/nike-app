import { products } from "../constants";
import PopulerProdactsCard from "./PopulerProdactsCard";
const PopulerProdacts = () => {
  return (
    <section id="products" className="max-container max-sm:mt-12 ">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-coral-red">Populer</span> products
        </h2>
        <p className="font-montserrat lg:max-w-lg mt-2 text-slate-gray">
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value
        </p>
      </div>
      <div className="mt-16  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 ">
        {products.map((product) => (
          <PopulerProdactsCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  );
};

export default PopulerProdacts;
