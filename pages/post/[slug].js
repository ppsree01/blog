import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import Image from 'next/image';

export async function getStaticPaths() {
    const files = fs.readdirSync('posts');
    const paths = files.map((fileName) => ({
        params: {
          slug: fileName.replace('.md', ''),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
  }

  export default function PostPage({ frontmatter, content }) {
    return (
      <div className='prose lg:prose-xl prose-slate mx-3.5 md:mx-auto'>
        <h1>{frontmatter.title}</h1>
        <Image className='w-full' height={1000} width={2000} src={`/${frontmatter.socialImage ?? 'images/default.png' }`} />
        <div className='px-6 pt-4 pb-2'>{frontmatter.tags.map((item) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{item}</span>
        ))}</div>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    );
  }