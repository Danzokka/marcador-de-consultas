import { SessionOptions } from "iron-session";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
};

export type Doctor = {
  id: string;
  name: string;
  crm: string;
  phone: string;
  email: string;
  clinica: string;
  especialidade: string;
  sobre: string;
  createdAt: string;
  updatedAt: string;
};

export type Schedule = {
  id: number;
  doctorId: number;
  userId?: number;
  day: string;
  hour: string;
  createdAt: string;
  updatedAt: string;
}

export type Review = {
  id: number;
  doctorId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  User: {
    name: string;
  }
}

export interface SessionData {
  user?: User;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "askjdhaskjdhaslkjldhaslkdhaklshljkdsahlksahkj",
  cookieName: "consultas",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  },
};
