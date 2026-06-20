import css from "./LayoutRecipes.module.css"
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const RecipesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default RecipesLayout;
