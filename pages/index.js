import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Home({ posts }) {
	return (

		<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0'>
			{posts.map(({ slug, frontmatter }) => (
				<div
					key={slug}
					className='max-w-sm rounded overflow-hidden shadow-lg flex flex-col m-2'
				>
					<Link href={`/post/${slug}`}>
						<a>
							<img className="w-full h-60"
								src={`/${frontmatter.socialImage ?? 'images/default.png'}`}
								alt="Post Image" />
							<div className="px-6 py-4">
								<div className="font-bold text-xl mb-2 text-slate-700">{frontmatter.title.toUpperCase()}</div>
								<p className="text-gray-500 text-base">
									{frontmatter.metaDesc.split('').splice(0,100).join('') + '...'}
								</p>
							</div>
						</a>
					</Link>
				</div>

			))}
		</div>
	)
}

export async function getStaticProps() {
	const files = fs.readdirSync('posts');
	const posts = files.map((fileName) => {
		const slug = fileName.replace('.md', '');
		const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
		const { data: frontmatter } = matter(readFile);

		return {
			slug,
			frontmatter,
		};
	});

	return {
		props: {
			posts,
		},
	};
}
