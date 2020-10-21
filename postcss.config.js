const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPurgecss = require(`@fullhuman/postcss-purgecss`);

const purgecss = postcssPurgecss({
  content: [
    `./public/**/*.html`,
    `./src/**/*.vue`,
  ],
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

    return broadMatches.concat(innerMatches)
  }
});


module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    ...process.env.NODE_ENV === `production`
      ? [purgecss]
      : [],
  ]
};

