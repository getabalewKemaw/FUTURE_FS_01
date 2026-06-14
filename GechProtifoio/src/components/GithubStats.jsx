import { useEffect, useState, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = 'getabalewKemaw';
const API_URL = `${import.meta.env.VITE_API_URL}/api/github-stats`;

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', 'C++': '#f34b7d', HTML: '#e34c26', CSS: '#563d7c',
  Shell: '#89e051', Dart: '#00B4AB', Kotlin: '#A97BFF', PHP: '#4F5D95',
  Go: '#00ADD8', Rust: '#dea584',
};

const Spinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
  </div>
);

const GithubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setStats(data);
          return;
        }
      } catch { /* fall through */ }

      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        if (cancelled) return;
        const profile = await profileRes.json();
        const repos = await reposRes.json();

        const langMap = {};
        repos.forEach((r) => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        const languages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1]).slice(0, 8)
          .map(([name, count]) => ({ name, count }));

        setStats({
          name: profile.name, login: profile.login, avatar_url: profile.avatar_url,
          followers: profile.followers, following: profile.following,
          publicRepos: profile.public_repos, totalRepos: repos.length,
          privateRepos: 0,
          totalStars: repos.reduce((s, r) => s + (r.stargazers_count || 0), 0),
          totalForks: repos.reduce((s, r) => s + (r.forks_count || 0), 0),
          languages, activityData: [],
          recentRepos: repos.slice(0, 10).map((r) => ({
            name: r.name, description: r.description, language: r.language,
            stars: r.stargazers_count, forks: r.forks_count, isPrivate: false,
            url: r.html_url, updatedAt: r.pushed_at,
          })),
        });
      } catch (err) {
        if (!cancelled) setError("Couldn't load GitHub stats.");
      }
    };
    fetchData().finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (loading || !stats || !sectionRef.current) return;
    const tween = gsap.from('.stat-card', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    });
    return () => tween.scrollTrigger?.kill();
  }, [loading, stats]);

  const maxLangCount = useMemo(
    () => (stats?.languages?.length > 0 ? stats.languages[0].count : 1),
    [stats]
  );

  if (loading) return <Spinner />;
  if (error || !stats) {
    return (
      <section id="github-stats" className="section text-center text-gray-500">
        <p className="font-fira uppercase tracking-widest text-sm">{error || "No data available."}</p>
      </section>
    );
  }

  return (
    <section id="github-stats" ref={sectionRef} className="section text-ink overflow-hidden">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="section-title">Code Activity</h2>
        <p className="text-gray-400 font-fira tracking-widest uppercase text-xs sm:text-sm mt-3">
          Live from GitHub · Includes Private Repos
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-10">
        <StatCard label="Repos" value={stats.totalRepos} sub={stats.privateRepos > 0 ? `${stats.privateRepos} private` : null} accent="cyan" />
        <StatCard label="Stars" value={stats.totalStars} accent="yellow" />
        <StatCard label="Forks" value={stats.totalForks} accent="purple" />
        <StatCard label="Followers" value={stats.followers} accent="green" />
        <StatCard label="Following" value={stats.following || 0} accent="pink" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="stat-card bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold mb-5 font-fira text-cyan-400 px-1 uppercase tracking-widest">
            Language Distribution
          </h3>
          <div className="space-y-3 px-1">
            {stats.languages.map(({ name, count }) => {
              const percentage = Math.round((count / stats.totalRepos) * 100);
              const barWidth = Math.round((count / maxLangCount) * 100);
              return (
                <div key={name}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-fira text-ink">{name}</span>
                    <span className="font-ibm-plex text-gray-400">{count} · {percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${barWidth}%`, backgroundColor: LANG_COLORS[name] || '#06b6d4' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stat-card bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold mb-5 font-fira text-blue-400 px-1 uppercase tracking-widest">
            Recent Public Stories
          </h3>
          <div className="space-y-2 px-1 max-h-[340px] overflow-y-auto custom-scrollbar">
            {stats.recentRepos
              .filter((repo) => !repo.isPrivate)
              .map((repo, i) => (
                  <a
                  key={i}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-surface transition-all duration-300 group border border-transparent hover:border-surface-weak"
                >
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: LANG_COLORS[repo.language] || '#6b7280' }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-fira text-sm text-ink group-hover:text-cyan-400 transition-colors truncate">
                      {repo.name}
                    </p>
                    <p className="font-ibm-plex text-[10px] text-gray-500 truncate leading-relaxed">
                      {repo.description || 'Continuous development in progress...'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 shrink-0 font-fira">
                    {repo.stars > 0 && <span className="text-yellow-500/80">★ {repo.stars}</span>}
                    <span className="bg-surface px-2 py-0.5 rounded text-[9px] uppercase">{repo.language || 'Code'}</span>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>

      <div className="stat-card bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm mt-8">
        <h3 className="text-sm font-bold mb-5 font-fira text-green-400 px-1 uppercase tracking-widest">
          Contribution Graph
        </h3>
        <div className="w-full overflow-x-auto">
          <img
            src={`https://ghchart.rshah.org/06b6d4/${GITHUB_USERNAME}`}
            alt="GitHub Contribution Graph"
            loading="lazy"
            decoding="async"
            className="w-full min-w-[700px] h-auto"
          />
        </div>
      </div>

      <div className="mt-10 text-center">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 glass rounded-full font-fira text-xs sm:text-sm uppercase tracking-wider hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-cyan-400"
        >
          View Full Profile on GitHub →
        </a>
        <p className="text-gray-500 font-ibm-plex italic text-xs sm:text-sm mt-4">
          * Live data from GitHub API · Includes private repository metrics
        </p>
      </div>
    </section>
  );
};

const StatCard = ({ label, value, sub, accent }) => {
  const accents = {
    cyan: 'hover:border-cyan-500/30 group-hover:text-cyan-400',
    yellow: 'hover:border-yellow-500/30 group-hover:text-yellow-400',
    purple: 'hover:border-purple-500/30 group-hover:text-purple-400',
    green: 'hover:border-green-500/30 group-hover:text-green-400',
    pink: 'hover:border-pink-500/30 group-hover:text-pink-400',
  }[accent];

  return (
    <div className={`stat-card bg-white shadow-sm p-5 sm:p-6 rounded-3xl flex flex-col items-center justify-center border border-gray-200 transition-all duration-300 group ${accents}`}>
      <span className="text-[10px] text-gray-400 font-fira mb-1.5 uppercase tracking-widest transition-colors">{label}</span>
      <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-space text-ink">{value}</span>
      {sub && <span className="text-[10px] text-cyan-400/60 font-ibm-plex mt-1">{sub}</span>}
    </div>
  );
};

export default GithubStats;
