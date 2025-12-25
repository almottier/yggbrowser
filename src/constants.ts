import { Category } from './types';

export const API_BASE_URL = 'https://yggapi.eu';

export const CATEGORIES: Category[] = [
  // Film/Vidéo
  { id: 2145, name: 'Film/Vidéo', parent: 'Film/Vidéo' },
  { id: 2178, name: 'Animation', parent: 'Film/Vidéo' },
  { id: 2179, name: 'Animation Série', parent: 'Film/Vidéo' },
  { id: 2180, name: 'Concert', parent: 'Film/Vidéo' },
  { id: 2181, name: 'Documentaire', parent: 'Film/Vidéo' },
  { id: 2182, name: 'Emission TV', parent: 'Film/Vidéo' },
  { id: 2183, name: 'Film', parent: 'Film/Vidéo' },
  { id: 2184, name: 'Série TV', parent: 'Film/Vidéo' },
  { id: 2185, name: 'Spectacle', parent: 'Film/Vidéo' },
  { id: 2186, name: 'Sport', parent: 'Film/Vidéo' },
  { id: 2187, name: 'Vidéo-clips', parent: 'Film/Vidéo' },

  // Audio
  { id: 2139, name: 'Audio', parent: 'Audio' },
  { id: 2147, name: 'Karaoké', parent: 'Audio' },
  { id: 2148, name: 'Musique', parent: 'Audio' },
  { id: 2150, name: 'Podcast Radio', parent: 'Audio' },
  { id: 2149, name: 'Samples', parent: 'Audio' },

  // Application
  { id: 2144, name: 'Application', parent: 'Application' },
  { id: 2177, name: 'Autre', parent: 'Application' },
  { id: 2176, name: 'Formation', parent: 'Application' },
  { id: 2171, name: 'Linux', parent: 'Application' },
  { id: 2172, name: 'MacOS', parent: 'Application' },
  { id: 2174, name: 'Smartphone', parent: 'Application' },
  { id: 2175, name: 'Tablette', parent: 'Application' },
  { id: 2173, name: 'Windows', parent: 'Application' },

  // Jeu vidéo
  { id: 2142, name: 'Jeu vidéo', parent: 'Jeu vidéo' },
  { id: 2167, name: 'Autre', parent: 'Jeu vidéo' },
  { id: 2159, name: 'Linux', parent: 'Jeu vidéo' },
  { id: 2160, name: 'MacOS', parent: 'Jeu vidéo' },
  { id: 2162, name: 'Microsoft', parent: 'Jeu vidéo' },
  { id: 2163, name: 'Nintendo', parent: 'Jeu vidéo' },
  { id: 2165, name: 'Smartphone', parent: 'Jeu vidéo' },
  { id: 2164, name: 'Sony', parent: 'Jeu vidéo' },
  { id: 2166, name: 'Tablette', parent: 'Jeu vidéo' },
  { id: 2161, name: 'Windows', parent: 'Jeu vidéo' },

  // eBook
  { id: 2140, name: 'eBook', parent: 'eBook' },
  { id: 2151, name: 'Audio', parent: 'eBook' },
  { id: 2152, name: 'Bds', parent: 'eBook' },
  { id: 2153, name: 'Comics', parent: 'eBook' },
  { id: 2154, name: 'Livres', parent: 'eBook' },
  { id: 2155, name: 'Mangas', parent: 'eBook' },
  { id: 2156, name: 'Presse', parent: 'eBook' },
];

export const CATEGORY_GROUPS = [
  'Film/Vidéo',
  'Audio',
  'Application',
  'Jeu vidéo',
  'eBook',
];
