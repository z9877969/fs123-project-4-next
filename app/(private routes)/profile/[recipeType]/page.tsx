type Props = {
  params: Promise<{ recipeType: string }>;
};

export default async function ProfileRecipeTypePage({ params }: Props) {
  const { recipeType } = await params;

  return (
    <div>
      <h1>Категорія профілю: {recipeType}</h1>
    </div>
  );
}
