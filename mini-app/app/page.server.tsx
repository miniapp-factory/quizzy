import type { Metadata } from "next";
import { title, description } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: `${process.env.NEXT_PUBLIC_URL}/icon.png`,
        ogTitle: title,
        ogDescription: description,
        ogImageUrl: `${process.env.NEXT_PUBLIC_URL}/icon.png`,
        button: {
          title: "Launch Mini App",
          action: {
            type: "launch_miniapp",
            name: title,
            url: process.env.NEXT_PUBLIC_URL,
            splashImageUrl: `${process.env.NEXT_PUBLIC_URL}/icon.png`,
            iconUrl: `${process.env.NEXT_PUBLIC_URL}/icon.png`,
            splashBackgroundColor: "#000000",
            description,
            primaryCategory: "utility",
            tags: [],
          },
        },
      }),
    },
  };
}
