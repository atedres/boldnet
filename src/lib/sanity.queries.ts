export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  excerpt_en,
  mainImage,
  publishedAt,
  author->{
    name,
    image
  }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  body,
  body_en,
  publishedAt,
  author->{
    name,
    image
  }
}`;
