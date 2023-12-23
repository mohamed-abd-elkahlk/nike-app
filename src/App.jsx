import CustomerReviwes from "./components/CustomerReviwes";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import PopulerProdacts from "./components/PopulerProdacts";
import Services from "./components/Services";
import SpecialOffer from "./components/SpecialOffer";
import Subscribe from "./components/Subscribe";
import SuperQualty from "./components/SuperQualty";

function App() {
  return (
    <main className="relative">
      <Nav />
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section className="padding">
        <PopulerProdacts />
      </section>
      <section className="padding">
        <SuperQualty />
      </section>
      <section className="padding-x py-10">
        <Services />
      </section>
      <section className="padding">
        <SpecialOffer />
      </section>
      <section className="padding bg-pale-blue">
        <CustomerReviwes />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full">
        <Subscribe />
      </section>
      <section className="padding-x padding-t pb-8 bg-black">
        <Footer />
      </section>
    </main>
  );
}

export default App;
