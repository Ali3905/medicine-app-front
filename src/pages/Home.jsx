import Buttons from "../components/Buttons";
import capsula from "../images/capsula.svg";


export function Home() {
  return (
    <div>

  <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-gray-300 p-10">
      <h1 className="fs-1  py- mt-3 font-bold text-center">Farmacia Hospital Carmelo</h1>
      <p className="text-md text-slate-400">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
        fugit doloremque molestias recusandae labore repellat amet dicta tempore
        necessitatibus facilis repellendus voluptas ducimus maiores deserunt sed
        quo ratione provident debitis aut, voluptatem aliquam iste blanditiis
        ex? Voluptatibus, fuga quasi necessitatibus cumque optio error enim,
        officia accusantium vitae doloremque, molestias modi.
      </p>

      <img src={capsula} alt="SVG Icon" />
      <Buttons />
     

    </header>
  </section>

  </div>
  );
}

