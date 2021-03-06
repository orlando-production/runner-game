/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import Helmet from 'react-helmet';

type PageMetaProps = {
    title?: string;
    description?: string;
    image?: string;
};

const cutTags = (text: string = '') => text.replace(/<\/?.+?>/gi, '');

const prepareData = ({ title, description, image }: PageMetaProps) => ({
  title: cutTags(title),
  description: cutTags(description).substr(0, 250),
  image
});

function PageMeta(props: PageMetaProps) {
  const { title, description, image } = prepareData(props);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      {Boolean(description) && (
        <meta name="description" content={description} />
      )}
      {Boolean(description) && (
        <meta property="og:description" content={description} />
      )}
      {Boolean(description) && (
        <meta property="twitter:description" content={description} />
      )}
      {Boolean(image) && <meta property="og:image" content={image} />}
    </Helmet>
  );
}

export { PageMeta };
