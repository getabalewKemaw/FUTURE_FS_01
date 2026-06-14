import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegComment, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1498050108023-c5249f4df085";

const Skeleton = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
  </div>
);

const Blog = ({ featuredOnly = false }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog`);
        if (!cancelled) setPosts(response.data || []);
      } catch {
        if (!cancelled) setError("Couldn't load posts. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPosts();
    return () => { cancelled = true; };
  }, []);

  const displayed = useMemo(
    () => (featuredOnly ? posts.slice(0, 3) : posts),
    [posts, featuredOnly]
  );

  if (loading) return <Skeleton />;

  return (
    <section id="blog" className="section">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="section-title">
          {featuredOnly ? "Latest Stories" : "All Insights"}
        </h2>
        <p className="text-gray-400 font-fira tracking-widest uppercase text-xs sm:text-sm mt-3">
          {featuredOnly ? "Recent thoughts and tutorials" : "Deep dives into tech and my journey"}
        </p>
      </div>

      {error && (
        <p className="text-center text-rose-400 mb-6 font-fira text-sm">{error}</p>
      )}

      {!error && displayed.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm">
          <p className="text-gray-400 font-fira tracking-widest uppercase text-sm">
            No stories published yet. Stay tuned!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {displayed.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
            className="bg-white group rounded-3xl overflow-hidden border border-gray-200 shadow-sm
                       transition-all duration-300 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1
                       flex flex-col h-full"
          >
            <div className="relative h-44 sm:h-48 overflow-hidden">
              <img
                src={post.cover_image || FALLBACK_IMG}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
              />
              {post.tags && post.tags.length > 0 && (
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-cyan-500/80 backdrop-blur-md text-[10px] px-2 py-0.5 rounded-full text-white uppercase font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6 flex flex-col flex-grow">
              <div className="flex items-center text-gray-400 text-xs mb-2 font-fira">
                <FaCalendarAlt className="mr-2" />
                {new Date(post.created_at).toLocaleDateString()}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 font-space group-hover:text-cyan-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm mb-5 line-clamp-3 font-ibm-plex flex-grow">
                {post.excerpt || (post.content?.substring(0, 150) + "...")}
              </p>

              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1 hover:text-red-400 transition-colors">
                    <FaRegHeart /> {post.likes_count || 0}
                  </span>
                  <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                    <FaRegComment /> {post.comments_count || 0}
                  </span>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider hover:underline flex items-center gap-2"
                >
                  Read Full <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {featuredOnly && posts.length > 3 && (
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 px-8 py-3 bg-white hover:bg-cyan-500/10 border border-gray-200 hover:border-cyan-500/50 rounded-full text-cyan-400 font-bold uppercase tracking-widest text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
          >
            View All Posts <FaArrowRight />
          </Link>
        </div>
      )}
    </section>
  );
};

export default Blog;
