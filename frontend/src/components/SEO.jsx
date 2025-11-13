import { Helmet } from "react-helmet";

const SEO = () => (
  <Helmet>
    {/* Basic SEO */}
    <title>QuillPad — Capture Your Thoughts</title>
    <meta
      name="description"
      content="QuillPad helps you write, reflect, and grow with powerful journaling tools."
    />
    <meta
      name="keywords"
      content="Vision app, notes, writing, diary, reflection, productivity"
    />

    {/* Open Graph / Facebook */}
    <meta property="og:title" content="QuillPad — Capture Your Thoughts" />
    <meta
      property="og:description"
      content="Your personal journal for clarity, creativity, and reflection."
    />
    <meta
      property="og:image"
      content="https://yourdomain.com/quillpad-preview.png"
    />
    <meta property="og:url" content="https://yourdomain.com" />
    <meta property="og:type" content="website" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="QuillPad — Capture Your Thoughts" />
    <meta
      name="twitter:description"
      content="Your personal journal for clarity, creativity, and reflection."
    />
    <meta
      name="twitter:image"
      content="https://yourdomain.com/quillpad-preview.png"
    />
  </Helmet>
);

export default SEO;
