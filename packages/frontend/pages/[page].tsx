import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { marked } from "marked";

import { Layout } from "@components/Layout";

import type { GetStaticProps } from "next";

interface PageProps {
  frontmatter: { [key: string]: string | undefined };
  content: string;
}

const Page: React.FC<PageProps> = ({
  frontmatter: { title, date },
  content,
}) => {
  return (
    <article className="prose mx-auto">
      <header>
        <h1>{title}</h1>
        <p>Stand: {date}</p>
      </header>
      <section dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </article>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("docs"));

  const paths = files.map((filename) => ({
    params: {
      page: filename.replace(".md", ""),
    },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const page = Array.isArray(params?.page) ? params?.page[0] : params?.page;
  const markdownWithMeta = fs.readFileSync(
    path.join("docs", `${page}.md`),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      content,
    },
  };
};

Page.Layout = Layout;

export default Page;
