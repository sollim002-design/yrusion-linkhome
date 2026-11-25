const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const output = path.join(root, "yrusion-linkhome-share.html");
const imageFiles = [
  "grey-musicstudio-logo.png",
  "yrusion-character.png",
  "kakaotalk-logo.png",
  "discord-logo.svg",
  "instagram-logo.svg",
  "x-logo.svg",
  "youtube-logo.svg",
];

const mimeTypes = {
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const inlineAsset = (name) => {
  const filePath = path.join(root, name);
  const data = fs.readFileSync(filePath).toString("base64");
  return `data:${mimeTypes[path.extname(name)]};base64,${data}`;
};

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

for (const asset of imageFiles) {
  html = html.split(`./${asset}`).join(inlineAsset(asset));
}

html = html
  .replace(/\s*<link rel="preconnect"[^>]*>/g, "")
  .replace(/\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, "")
  .replace(/\s*<link rel="stylesheet" href="\.\/style\.css\?[^>]*>/g, "")
  .replace(/<\/head>/, `  <style>\n${css}\n  </style>\n  </head>`)
  .replace(/<script src="\.\/script\.js"><\/script>/, `<script>\n${js}\n  <\/script>`)
  .replace('href="./index.html"', 'href="#top"')
  .replace('<body>', '<body id="top">');

fs.writeFileSync(output, `<!-- Standalone share file generated from index.html. -->\n${html}`);
console.log(`Created ${output}`);
