import { medicoData } from "@/classes/medico";
import React from "react";
import { Star } from "lucide-react";
import { Doctor, Review, Schedule } from "@/app/lib";
interface MedicStatsProps {
  props: {
    medic: Doctor;
    medicSchedules: Schedule[];
    medicReviews: Review[];
  };
  className?: string;
}

function getMedicRating(reviews: Review[]) {
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (total / reviews.length).toFixed(1) || 0;
}

function getTotalSchedules(schedules: Schedule[]) {
  return schedules.length;
}

function getTotalAppointments(schedules: Schedule[]) {
  const today = new Date();

  return schedules.filter((schedule) => {
    // Converte a data dd/mm/aaaa para um objeto Date
    const [day, month, year] = schedule.day.split("/").map(Number);
    const scheduleDate = new Date(year, month - 1, day); // month é 0-indexed em JS

    // Retorna true se a data da consulta já passou (é anterior à data atual)
    return scheduleDate < today && (schedule.userId !== undefined || schedule.userId !== null);
  }).length;
}

function getFreeSchedules(schedules: Schedule[]) {
  const today = new Date();

  return schedules.filter((schedule) => {
    // Converte a data dd/mm/aaaa para um objeto Date
    const [day, month, year] = schedule.day.split("/").map(Number);
    const scheduleDate = new Date(year, month - 1, day); // month é 0-indexed em JS

    // Verifica se a data é futura (maior ou igual à data atual) E se não há usuário associado
    return (
      scheduleDate >= today &&
      (schedule.userId === undefined || schedule.userId === null)
    );
  }).length;
}

const MedicStats = ({ props, className }: MedicStatsProps) => {
  const Card = ({ title, value }: { title: string | number, value: string | number }) => {
    return (
      <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center gap-2">
        <dt className="order-last text-lg font-medium text-gray-500">
          {title}
        </dt>
        <dd className="text-2xl font-bold text-blue-600 md:text-4xl">
          {title === "Avaliação" ? (
            <div className="flex items-center justify-center gap-4">
              {value}
              <Star size={36} fill="#fde047" className="text-yellow-300" />
            </div>
          ) : (
            value
          )}
        </dd>
      </div>
    );
  };

  const stats = [
    { title: "Avaliação", value: getMedicRating(props.medicReviews) },
    { title: "Consultas Realizadas", value: getTotalAppointments(props.medicSchedules).toString() },
    { title: "Consultas Abertas", value: getFreeSchedules(props.medicSchedules).toString() },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-primary sm:text-4xl tracking-wide">
          Sobre o médico
        </h2>

        <p className="mt-4 text-gray-500 sm:text-xl">
          Veja como o médico está se saindo dentro da plataforma
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} title={stat.title} value={stat.value} />
        ))}
      </dl>
    </div>
  );
};

export default MedicStats;
