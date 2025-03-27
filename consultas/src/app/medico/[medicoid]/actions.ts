"use server";
import { Doctor } from "@/app/lib";
import axios from "axios";
import { getSession } from "@/app/actions";

export const getMedico = async (medicoid: number): Promise<Doctor | null> => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/doctor/${medicoid}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMedicoReviews = async (medicoid: number) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/review/doctor/${medicoid}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMedicoSchedules = async (medicoid: number) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/schedule/doctor/${medicoid}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const bookSchedule = async (scheduleId: number) => {
  const user = await getSession();
  if (!user.isLoggedIn) {
    console.error("Usuário não autenticado");
    return null;
  }
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/schedule/book`,
      {
        scheduleId,
        userId: user.user?.id,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
