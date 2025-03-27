"use server";
import axios from "axios";
import { User } from "../lib";
import { createSession } from "../actions";

type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
};

type SignupData = {
  name: string;
  sobrenome: string;
  email: string;
  password: string;
  phone: string;
  cpfCnpj: string;
};

function formatData(data: SignupData): CreateUserDto {
  const formData = {
    name: `${data.name} ${data.sobrenome}`,
    email: data.email,
    password: data.password,
    phone: data.phone,
    cpf: data.cpfCnpj,
  };
  return formData;
}

export async function signup(data: SignupData) {
  try {
    const userData = formatData(data);
    const response = await axios.post(
      `${process.env.BACKEND_URL}/user`,
      userData
    );

    const user: User = response.data;

    if (!user) {
      return null;
    }

    await createSession(user);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/user/auth`, {
      email,
      password,
    });

    const user: User = response.data;

    if (!user) {
      return null;
    }

    await createSession(user);
  } catch (error) {
    console.error(error);
    return null;
  }
}
