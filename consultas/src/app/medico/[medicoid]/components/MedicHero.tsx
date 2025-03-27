/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScheduleForm from "./Form";
import { Doctor, Schedule } from "@/app/lib";
import { redirect } from "next/navigation";
import { getSession, navigate } from "@/app/actions";
import ButtonClient from "./Button";

interface MedicHeroProps {
  medic: Doctor;
  schedules: Schedule[];
  className?: string;
}

const MedicHero = async ({ medic, schedules }: MedicHeroProps) => {
  const user = await getSession();

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div className="max-w-lg md:max-w-none flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
                {medic.name}
              </h2>
              <h3 className="text-xl font-semibold text-gray-700">
                {medic.especialidade}
              </h3>
            </div>

            <p className="mt-4 text-gray-700">{medic.sobre}</p>
            <div className="w-full flex items-center justify-start">
              <Dialog>
                <ButtonClient isLoggedIn={user.isLoggedIn} />
                <DialogContent>
                  <ScheduleForm
                    props={{
                      medic: medic,
                      schedules: schedules,
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div>
            <img src="/doctors.jpg" className="rounded" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicHero;
