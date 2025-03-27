"use server";
import axios from "axios";
import { getSession } from "../actions";

export async function getUserSchedules(userId: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/schedule/user/${userId}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function cancelSchedule(scheduleId: number) {
  try {
    const user = await getSession();

    if (!user.isLoggedIn) {
      console.error("Usuário não autenticado");
      return null;
    }

    const response = await axios.post(
      `${process.env.BACKEND_URL}/schedule/cancel`,
      {
        scheduleId,
        userId: user.user?.id,
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
