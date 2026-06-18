import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { FetchRecipesResponse } from "./clientApi";
import { api } from "@/app/api/api";


export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/current", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};


interface FetchServerParams {
  page: number;
  search?: string;
  category?: string;
}

export async function fetchRecipesServer({
  page,
  search,
  category,
}: FetchServerParams): Promise<FetchRecipesResponse> {
  try {
    const cookieStore = await cookies();

    const params = {
      page,
      perPage: 12,
      search: search || undefined,
      category: category || undefined,
    };
const res = await api.get('/api/recipes', { 
  params,
  headers: {
    Cookie: cookieStore.toString(),
  },
    });

    return res.data;
  } catch (error) {
    console.error("Server fetch error:", error);
    
    return {
      page: 1,
      perPage: 12,
      totalRecipes: 0,
      totalPages: 0,
      recipes: [],
    };
  }
}