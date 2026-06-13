import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Recipes.client";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: `${tag} notes`,
    description: `List of ${tag} notes`,
    openGraph: {
      title: `${tag} notes`,
      description: `List of ${tag} notes`,
      url: `https://notehub.com/notes/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${tag} list`,
        },
      ],
      type: "article",
    },
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();
  const query = "";
  const page = 1;
  await queryClient.prefetchQuery({
    queryKey: ["notes", query, page, tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
