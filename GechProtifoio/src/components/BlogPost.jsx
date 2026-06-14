import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { AnimatePresence } from "framer-motion";
import {
  FaArrowLeft, FaHeart, FaRegHeart, FaPaperPlane, FaReply, FaCommentDots
} from "react-icons/fa";

const DEFAULT_AVATAR = "/images/avatars.png";
const FALLBACK_IMG = "https://images.unsplash.com/photo-1498050108023-c5249f4df085";

const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
  </div>
);

const buildTree = (flat) => {
  const map = new Map();
  flat.forEach((c) => map.set(c.id, { ...c, children: [] }));
  const roots = [];
  map.forEach((c) => {
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id).children.push(c);
    } else {
      roots.push(c);
    }
  });
  return roots;
};

const CommentItem = ({
  comment, allComments, activeReplyId, setActiveReplyId,
  replyData, setReplyData, handleCommentSubmit, depth = 0
}) => {
  const isReplying = activeReplyId === comment.id;
  const replies = useMemo(
    () => allComments.filter((c) => c.parent_id === comment.id),
    [allComments, comment.id]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <div className="glass p-4 sm:p-5 rounded-2xl border border-white/5">
        <div className="flex items-start gap-3">
          <img
            src={DEFAULT_AVATAR}
            alt=""
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-white/5 p-1 shrink-0"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold font-space text-cyan-400 text-sm truncate">
                {comment.author_name}
              </span>
              <span className="text-gray-500 text-[10px] font-fira shrink-0">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-300 text-sm font-ibm-plex leading-relaxed mb-2 break-words">
              {comment.content}
            </p>
            {depth < 3 && (
              <button
                onClick={() => setActiveReplyId(isReplying ? null : comment.id)}
                className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest"
              >
                <FaReply /> {isReplying ? "Cancel" : "Reply"}
              </button>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isReplying && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={(e) => handleCommentSubmit(e, comment.id)}
              className="overflow-hidden mt-3 pt-3 border-t border-white/5 space-y-2"
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                value={replyData.name}
                onChange={(e) => setReplyData({ ...replyData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none"
              />
              <textarea
                placeholder={`Replying to ${comment.author_name}...`}
                required
                rows={3}
                value={replyData.content}
                onChange={(e) => setReplyData({ ...replyData, content: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none resize-none"
              />
              <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 rounded-lg text-xs flex items-center gap-2 transition-colors">
                Send Reply <FaPaperPlane />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {replies.length > 0 && (
        <div className="ml-4 sm:ml-8 mt-3 border-l-2 border-white/5 pl-3 sm:pl-4 space-y-3">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              allComments={allComments}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              replyData={replyData}
              setReplyData={setReplyData}
              handleCommentSubmit={handleCommentSubmit}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [commentData, setCommentData] = useState({ name: "", email: "", content: "" });
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyData, setReplyData] = useState({ name: "", content: "" });

  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/blog/${slug}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/blog/${slug}/comments`),
        ]);
        if (cancelled) return;
        setPost(postRes.data);
        setComments(commentRes.data || []);
      } catch (err) {
        if (!cancelled) {
          if (err.response?.status === 404) setNotFound(true);
          else setPost(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAll();
    return () => { cancelled = true; };
  }, [slug]);

  const handleLike = useCallback(async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/${slug}/like`);
      setPost((p) => (p ? { ...p, likes_count: res.data.likes_count } : p));
      setLiked(true);
    } catch (err) {
      console.error("Like failed:", err);
    }
  }, [slug]);

  const handleCommentSubmit = useCallback(async (e, parentId = null) => {
    e.preventDefault();
    const data = parentId ? replyData : commentData;
    if (!data.name?.trim() || !data.content?.trim()) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blog/${slug}/comments`,
        { author_name: data.name, author_email: data.email, content: data.content, parent_id: parentId }
      );
      setComments((prev) => [...prev, res.data]);
      if (parentId) {
        setReplyData({ name: "", content: "" });
        setActiveReplyId(null);
      } else {
        setCommentData({ name: "", email: "", content: "" });
        setShowForm(false);
      }
    } catch (err) {
      console.error("Comment failed:", err);
    }
  }, [commentData, replyData, slug]);

  const rootComments = useMemo(() => buildTree(comments), [comments]);

  if (loading) return <Spinner />;
  if (notFound || !post) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-white">
        <h2 className="text-2xl font-bold mb-4 font-space uppercase">Story not found</h2>
        <Link to="/blog" className="text-cyan-400 font-fira hover:underline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen text-white pb-20 pt-28">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-cyan-400 mb-8 hover:-translate-x-1 transition-transform font-bold uppercase text-xs tracking-widest"
        >
          <FaArrowLeft /> Back to Stories
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass p-6 sm:p-10 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden mb-10"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600" />

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-cyan-500/10 text-[10px] px-2.5 py-0.5 rounded-full text-cyan-400 border border-cyan-400/20 uppercase font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-space mb-5 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 text-xs font-fira uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <FaCommentDots className="text-cyan-500" /> {comments.length} Comments
            </span>
            <span className="flex items-center gap-2">
              <FaHeart className="text-red-500" /> {post.likes_count || 0} Likes
            </span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </motion.header>

        {post.cover_image && (
          <div className="aspect-video rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
            <img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
            />
          </div>
        )}

        <div className="markdown-content prose prose-invert max-w-none font-ibm-plex text-gray-300 leading-relaxed text-base sm:text-lg mb-12">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleLike}
            disabled={liked}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all duration-300 active:scale-95 ${
              liked
                ? "bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-red-400/50 hover:text-red-400"
            }`}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span className="font-bold uppercase tracking-widest text-sm">
              {post.likes_count || 0} Loves
            </span>
          </button>
        </div>

        {/* Discussion */}
        <section aria-labelledby="discussion">
          <div className="flex justify-between items-end border-b border-white/10 pb-5 mb-8">
            <h3 id="discussion" className="text-2xl sm:text-3xl font-extrabold font-space uppercase">
              Discussion
            </h3>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-2.5 px-5 sm:px-7 rounded-xl text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                Leave a Comment <FaCommentDots />
              </button>
            )}
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                onSubmit={handleCommentSubmit}
                className="glass p-6 sm:p-8 rounded-3xl border border-white/10 mb-8 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-base sm:text-lg font-bold font-space text-cyan-400 uppercase tracking-widest">
                    New Comment
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Display Name"
                    required
                    value={commentData.name}
                    onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email (Optional)"
                    value={commentData.email}
                    onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none"
                  />
                </div>
                <textarea
                  placeholder="What's on your mind? Be kind and respectful..."
                  rows={5}
                  required
                  value={commentData.content}
                  onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cyan-400 outline-none resize-none"
                />
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold py-3 px-8 rounded-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-xs">
                  Post Discussion <FaPaperPlane />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            {rootComments.length > 0 ? (
              rootComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  allComments={comments}
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                  replyData={replyData}
                  setReplyData={setReplyData}
                  handleCommentSubmit={handleCommentSubmit}
                />
              ))
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-white/5 rounded-[2rem]">
                <FaCommentDots className="text-4xl text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 font-fira tracking-widest uppercase text-sm">
                  No comments yet. Start the conversation!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </article>
  );
};

export default BlogPost;
