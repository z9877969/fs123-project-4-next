import RecipesClient from "./Recipes.client";
import { fetchRecipesServer } from "@/lib/api/serverApi"; 

interface PageProps {
  params: {
    slug: string[]; 
  };
  searchParams: {
    search?: string;
  };
}

export default async function RecipesFilterPage({ params, searchParams }: PageProps) {
  const searchQuery = searchParams.search || "";
  
  const rawCategory = params.slug?.[0] || "all";
  const currentCategory = rawCategory === "all" ? "" : rawCategory;

  // 3. Робимо запит за ПЕРШОЮ сторінкою (12 елементів) на сервері.
  // Заміни fetchRecipesServer на ту функцію, яку ти використовуєш для серверних запитів.
  const initialData = await fetchRecipesServer({
    page: 1,
    search: searchQuery,
    category: currentCategory,
  });

  return (
    <section>
      <RecipesClient 
        initialRecipes={initialData.recipes}
        totalPages={initialData.totalPages}
        totalRecipes={initialData.totalRecipes}
        searchQuery={searchQuery}
        currentCategory={currentCategory}
      />
    </section>
  );
}