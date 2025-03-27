import BuscaCategoria from "@/components/BuscaCategoria";
import Hero from "@/components/Hero";
import { getAllDoctors } from "./actions";

export default async function Home() {
  const doctors = await getAllDoctors();
  return (
    <div className="max-w-screen h-full flex flex-col items-center justify-center gap-12">
      {/* Hero */}
      <Hero />
      {/* Busca doutores */}
      <BuscaCategoria doctors={doctors}/>
    </div>
  );
}
