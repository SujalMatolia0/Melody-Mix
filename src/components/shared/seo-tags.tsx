export const SeoTags = (props: {
  title: string;
  description: string;
  image: string;
  url: string;
}) => {
  const url = new URL(props.url);

  return (
    <>
      <meta name="description" content={props.description} key="desc" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
      <meta property="og:image:alt" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Eternal Heroes Foundation" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={url.hostname} />
      <meta property="twitter:url" content={props.url} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
    </>
  );
};
