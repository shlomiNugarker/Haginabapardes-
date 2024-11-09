/* eslint-disable @typescript-eslint/no-explicit-any */
import { getContentBlocksByPageId } from "@/services/db/repositories/contentBlockRepository";
import { getPageByName } from "@/services/db/repositories/pageRepository";
import Image from "next/image";
import Link from "next/link";

export default async function About() {
  const aboutPage = await getPageByName("about");

  if (!aboutPage) {
    return <div>דף האודות לא נמצא</div>;
  }

  const contentBlocks = await getContentBlocksByPageId(aboutPage.id);

  const sortedBlocks = contentBlocks.sort(
    (a, b) => (a.position || 0) - (b.position || 0)
  );

  return (
    <section className="pb-12 pt-24 px-4 max-w-screen-lg mx-auto mt-2 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-customNavy">
        {aboutPage.title}
      </h1>
      <p className="text-2xl text-center text-gray-600 mb-8">
        {aboutPage.description}
      </p>

      {sortedBlocks.map((block) => {
        if (block.block_type === "text") {
          return (
            <div key={block.id} className="my-12">
              <p className="text-gray-600 text-xl mb-6">{block.content}</p>
            </div>
          );
        }

        if (block.block_type === "image") {
          const imageUrl = block.content;
          return (
            <div key={block.id} className="my-12 text-center">
              <Image
                src={imageUrl}
                alt="About page image"
                className="mx-auto rounded-lg"
                width={300}
                height={300}
              />
            </div>
          );
        }

        if (block.block_type === "list") {
          const listItems = JSON.parse(block.content || "[]");
          return (
            <div key={block.id} className="my-12">
              <ul className="list-disc list-inside text-gray-600 space-y-3">
                {listItems.map((item: any, index: any) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          );
        }

        return null;
      })}

      <div className="my-12 text-center">
        <h2 className="text-3xl font-semibold text-customNavy mb-4">
          בואו לבקר אותנו!
        </h2>
        <p className="text-gray-600 mb-6">
          הגעתם למקום הנכון להתרשמות מהחקלאות האורגנית שלנו.
        </p>
        <p className="text-gray-600">
          <Link
            href="https://www.google.com/maps/search/?api=1&query=רחוב+השדה+10,+פרדס+חנה-כרכור,+ישראל"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-customGreen hover:underline"
          >
            כתובת: רחוב השדה 10, פרדס חנה-כרכור, ישראל
          </Link>
        </p>
      </div>
    </section>
  );
}
