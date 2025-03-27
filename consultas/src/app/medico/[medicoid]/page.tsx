/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getMedico, getMedicoReviews, getMedicoSchedules } from "./actions";

import MedicHero from "./components/MedicHero";
import MedicStats from "./components/MedicStats";
import MedicTestimonials from "./components/MedicTestimonials";

const page = async ({ params }: any) => {
  const medico = await getMedico(params.medicoid);
  const medicReviews = await getMedicoReviews(params.medicoid);
  const medicSchedules = await getMedicoSchedules(params.medicoid);

  if (!medico) {
    return <div>Medico não encontrado</div>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12">
      <MedicHero medic={medico} schedules={medicSchedules} />
      <MedicStats
        props={{
          medic: medico,
          medicReviews: medicReviews,
          medicSchedules: medicSchedules,
        }}
      />
      <MedicTestimonials reviews={medicReviews} />
    </div>
  );
};

export default page;
