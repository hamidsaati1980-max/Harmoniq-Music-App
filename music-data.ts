export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  seconds: number;
  artwork: string;
  mood: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  count: string;
  artwork: string;
  accent: string;
};

export const tracks: Track[] = [
  {
    id: 'glasshouse',
    title: 'Glasshouse',
    artist: 'Mara Vela',
    album: 'Soft Focus',
    duration: '3:42',
    seconds: 222,
    artwork: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'Late night',
  },
  {
    id: 'afterimage',
    title: 'Afterimage',
    artist: 'Nico Sunday',
    album: 'Rooms With No View',
    duration: '4:18',
    seconds: 258,
    artwork: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'Drifting',
  },
  {
    id: 'half-light',
    title: 'Half Light',
    artist: 'June Sola',
    album: 'The Long Way Home',
    duration: '3:56',
    seconds: 236,
    artwork: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'Warm',
  },
  {
    id: 'violet-hour',
    title: 'Violet Hour',
    artist: 'Mira Kline',
    album: 'Violet Hour',
    duration: '5:04',
    seconds: 304,
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'Nocturne',
  },
  {
    id: 'slow-morning',
    title: 'Slow Morning',
    artist: 'Theo Kind',
    album: 'Small Hours',
    duration: '3:21',
    seconds: 201,
    artwork: 'https://images.pexels.com/photos/1739842/pexels-photo-1739842.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'Acoustic',
  },
  {
    id: 'soft-static',
    title: 'Soft Static',
    artist: 'Kite Arcade',
    album: 'Signal Bloom',
    duration: '4:44',
    seconds: 284,
    artwork: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'Electronic',
  },
  {
    id: 'northbound',
    title: 'Northbound',
    artist: 'Yumi Vale',
    album: 'Still Moving',
    duration: '4:01',
    seconds: 241,
    artwork: 'https://images.pexels.com/photos/161853/guitar-music-musician-instrument-161853.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'Focus',
  },
  {
    id: 'blue-film',
    title: 'Blue Film',
    artist: 'Oren Moss',
    album: 'Local Weather',
    duration: '2:58',
    seconds: 178,
    artwork: 'https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'Ambient',
  },
  {
    id: 'open-water',
    title: 'Open Water',
    artist: 'Vale & The North',
    album: 'Open Water',
    duration: '3:49',
    seconds: 229,
    artwork: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'Indie',
  },
  {
    id: 'night-drive',
    title: 'Night Drive',
    artist: 'The Meridian',
    album: 'Headlights',
    duration: '4:26',
    seconds: 266,
    artwork: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=700',
    mood: 'After dark',
  },
];

export const playlists: Playlist[] = [
  {
    id: 'deep-work',
    title: 'Deep Work',
    description: 'A clear desk for a noisy mind.',
    count: '28 tracks · 2 hr 04 min',
    artwork: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'category-focus',
  },
  {
    id: 'midnight-city',
    title: 'Midnight City',
    description: 'Streetlights, open windows, no destination.',
    count: '34 tracks · 2 hr 31 min',
    artwork: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'category-night',
  },
  {
    id: 'slow-sunday',
    title: 'Slow Sunday',
    description: 'Nothing scheduled until further notice.',
    count: '21 tracks · 1 hr 26 min',
    artwork: 'https://images.pexels.com/photos/161853/guitar-music-musician-instrument-161853.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'category-acoustic',
  },
  {
    id: 'new-shaped',
    title: 'New & Shaped',
    description: 'Fresh releases with a familiar feeling.',
    count: '19 tracks · 1 hr 12 min',
    artwork: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'category-jazz',
  },
];

export const categories = [
  { id: 'ambient', title: 'Ambient', description: 'Soft edges, open space', accent: 'category-ambient' },
  { id: 'focus', title: 'Focus', description: 'A little less elsewhere', accent: 'category-focus' },
  { id: 'after-dark', title: 'After dark', description: 'For the last train home', accent: 'category-night' },
  { id: 'jazz', title: 'New jazz', description: 'Old language, new shapes', accent: 'category-jazz' },
  { id: 'electronic', title: 'Electronic', description: 'Signal in the quiet', accent: 'category-electronic' },
  { id: 'acoustic', title: 'Acoustic', description: 'Hands, wood, room tone', accent: 'category-acoustic' },
];

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
};