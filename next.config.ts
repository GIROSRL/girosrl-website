import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Esplicito turbopack.root per evitare l'autodetect errata quando il path
  // contiene spazi/accenti (Google Drive → "Il mio Drive", "GI.R.O."): Turbopack
  // con autodetect fallisce con "invalid digit found in string" su workspace
  // roots non ASCII. __dirname pin alla cartella del progetto.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
