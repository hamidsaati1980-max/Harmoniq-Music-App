import { useMemo, useState } from "react";
import {
  Search,
  Sparkles,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Home,
  Library,
  ListMusic,
  Volume2,
  Menu,
  X,
} from "lucide-react";
import { tracks, playlists, categories, formatTime, type Track } from "./music-data";

function AdBanner() {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
      <div className="text-[11px] uppercase tracking-[0.25em] text-white/30">
        Advertisement
      </div>
      <div className="mt-1 text-xs text-white/40">
        Your ad will appear here
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [aiMode, setAiMode] = useState(false);

  const filteredTracks = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tracks.filter((track) => {
      const matchesSearch =
        !q ||
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q) ||
        track.album.toLowerCase().includes(q) ||
        track.mood.toLowerCase().includes(q);

      const matchesCategory =
        !activeCategory ||
        track.mood.toLowerCase().includes(activeCategory.toLowerCase()) ||
        track.artist.toLowerCase().includes(activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  function playTrack(track: Track) {
    setCurrentTrack(track);
    setPlaying(true);
  }

  function toggleLike(id: string) {
    setLiked((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id],
    );
  }

  function nextTrack() {
    if (!currentTrack) return;

    const index = tracks.findIndex((track) => track.id === currentTrack.id);
    const next = tracks[(index + 1) % tracks.length];

    setCurrentTrack(next);
    setPlaying(true);
  }

  function previousTrack() {
    if (!currentTrack) return;

    const index = tracks.findIndex((track) => track.id === currentTrack.id);
    const previous = tracks[(index - 1 + tracks.length) % tracks.length];

    setCurrentTrack(previous);
    setPlaying(true);
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Mobile menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden">
          <div className="absolute left-0 top-0 h-full w-72 bg-[#111113] p-6">
            <button
              onClick={() => setMobileMenu(false)}
              className="mb-8 rounded-xl p-2 hover:bg-white/10"
            >
              <X size={22} />
            </button>

            <nav className="space-y-3">
              <button className="flex w-full items-center gap-3 rounded-xl bg-white/10 p-3">
                <Home size={19} />
                Home
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/10">
                <Library size={19} />
                Your Library
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/10">
                <ListMusic size={19} />
                Playlists
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090b]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:px-8">
          <button
            onClick={() => setMobileMenu(true)}
            className="rounded-xl p-2 hover:bg-white/10 md:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="mr-auto flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black">
              <Sparkles size={21} />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                Harmoniq <span className="text-white/40">AI</span>
              </div>
              <div className="hidden text-[10px] uppercase tracking-[0.3em] text-white/30 sm:block">
                Music intelligence
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative hidden w-full max-w-xl md:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                aiMode
                  ? "Ask Harmoniq AI for music..."
                  : "Search songs, artists, albums..."
              }
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-3 pl-11 pr-14 text-sm outline-none transition focus:border-white/25"
            />

            <button
              onClick={() => setAiMode(!aiMode)}
              title="AI Search"
              className={`absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs transition ${
                aiMode
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              <Sparkles size={14} />
              AI
            </button>
          </div>

          <button className="hidden rounded-xl px-4 py-2 text-sm text-white/60 hover:bg-white/10 hover:text-white md:block">
            Sign in
          </button>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-4 md:hidden">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Harmoniq..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-3 pl-11 pr-4 text-sm outline-none"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-36 pt-8 md:px-8">
        {/* Hero */}
        <section className="mb-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/60">
              <Sparkles size={13} />
              AI-powered music discovery
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Music that understands
              <span className="block text-white/40">your mood.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45 md:text-base">
              Discover music with Harmoniq AI. Search by song, artist, mood,
              atmosphere, or simply describe what you want to hear.
            </p>
          </div>
        </section>

        {/* AI search prompt */}
        {aiMode && (
          <section className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.03] p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white p-2 text-black">
                <Sparkles size={18} />
              </div>

              <div>
                <h2 className="font-semibold">Harmoniq AI Search</h2>
                <p className="mt-1 text-sm text-white/45">
                  Try: “calm music for sleeping”, “dark Turkish night music”,
                  or “something peaceful for studying”.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Advertisement */}
        <div className="mb-10">
          <AdBanner />
        </div>

        {/* Categories */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Explore moods</h2>

            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="text-xs text-white/40 hover:text-white"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.title ? null : category.title,
                  )
                }
                className={`rounded-2xl border p-4 text-left transition ${
                  activeCategory === category.title
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                }`}
              >
                <div className="font-medium">{category.title}</div>
                <div className="mt-1 text-xs text-white/35">
                  {category.description}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Tracks */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {query ? "Search results" : "Made for you"}
            </h2>

            <span className="text-xs text-white/30">
              {filteredTracks.length} tracks
            </span>
          </div>

          <div className="grid gap-3">
            {filteredTracks.map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              const isLiked = liked.includes(track.id);

              return (
                <div
                  key={track.id}
                  className={`group flex items-center gap-4 rounded-2xl border p-3 transition ${
                    isCurrent
                      ? "border-white/20 bg-white/[0.08]"
                      : "border-white/5 bg-white/[0.025] hover:bg-white/[0.06]"
                  }`}
                >
                  <button
                    onClick={() => {
                      if (isCurrent) {
                        setPlaying(!playing);
                      } else {
                        playTrack(track);
                      }
                    }}
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                  >
                    <img
                      src={track.artwork}
                      alt=""
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                      {isCurrent && playing ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} fill="currentColor" />
                      )}
                    </div>
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{track.title}</div>
                    <div className="truncate text-sm text-white/40">
                      {track.artist} · {track.album}
                    </div>
                  </div>

                  <div className="hidden text-xs text-white/30 sm:block">
                    {track.mood}
                  </div>

                  <button
                    onClick={() => toggleLike(track.id)}
                    className={`rounded-xl p-2 transition ${
                      isLiked
                        ? "text-white"
                        : "text-white/25 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={isLiked ? "currentColor" : "none"}
                    />
                  </button>

                  <span className="w-10 text-right text-xs text-white/30">
                    {track.duration}
                  </span>
                </div>
              );
            })}

            {filteredTracks.length === 0 && (
              <div className="rounded-2xl border border-white/10 p-10 text-center">
                <Sparkles className="mx-auto mb-3 text-white/30" />
                <div className="font-medium">No music found</div>
                <div className="mt-1 text-sm text-white/35">
                  Try another search or ask Harmoniq AI.
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Playlists */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Featured playlists</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left transition hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <img
                  src={playlist.artwork}
                  alt=""
                  className="aspect-square w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold">{playlist.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/40">
                    {playlist.description}
                  </p>
                  <p className="mt-3 text-[11px] text-white/25">
                    {playlist.count}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom player */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#111113]/95 px-4 py-3 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <img
              src={currentTrack.artwork}
              alt=""
              className="h-12 w-12 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">
                {currentTrack.title}
              </div>
              <div className="truncate text-xs text-white/40">
                {currentTrack.artist}
              </div>
            </div>

            <button
              onClick={previousTrack}
              className="hidden rounded-xl p-2 text-white/50 hover:bg-white/10 hover:text-white sm:block"
            >
              <SkipBack size={19} />
            </button>

            <button
              onClick={() => setPlaying(!playing)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
            >
              {playing ? (
                <Pause size={18} />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="rounded-xl p-2 text-white/50 hover:bg-white/10 hover:text-white"
            >
              <SkipForward size={19} />
            </button>

            <div className="hidden items-center gap-2 md:flex">
              <Volume2 size={18} className="text-white/40" />
              <div className="h-1 w-20 rounded-full bg-white/20">
                <div className="h-full w-2/3 rounded-full bg-white" />
              </div>
            </div>

            <div className="hidden text-xs text-white/30 lg:block">
              {formatTime(0)} / {currentTrack.duration}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
