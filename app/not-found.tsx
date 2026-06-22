import Link from 'next/link';
import Image from 'next/image';
import css from './NotFound.module.css';

const RecipeNotFound = () => {
  return (
    <div className={css.container}>
      <Image
        src="/not-found.jpg" // заміни на свій шлях до картинки
        alt="Recipe not found"
        width={600}
        height={438}
        className={css.image}
      />
      <h1 className={css.code}>404</h1>
      <p className={css.message}>Recipe not found</p>
      <Link href="/" className={css.button}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default RecipeNotFound;
