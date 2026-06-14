import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { FaUpload, FaPlus, FaCheckCircle, FaSpinner, FaLock, FaUser, FaExclamationTriangle } from 'react-icons/fa';

const AdminBlog = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    published: true
  });
  const [coverImage, setCoverImage] = useState(null);
  const [extraMedia, setExtraMedia] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('blog_admin_auth')) setAuthenticated(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/login`, loginData);
      const authString = btoa(`${loginData.email}:${loginData.password}`);
      localStorage.setItem('blog_admin_auth', authString);
      setAuthenticated(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('blog_admin_auth');
    setAuthenticated(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'cover_image') setCoverImage(e.target.files[0]);
    else setExtraMedia(Array.from(e.target.files));
  };

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', content: '', tags: '', published: true });
    setCoverImage(null);
    setExtraMedia([]);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const authHeader = localStorage.getItem('blog_admin_auth');
    try {
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('excerpt', formData.excerpt);
      postData.append('content', formData.content);
      postData.append('published', formData.published);
      const tagsArray = formData.tags.split(',').map((t) => t.trim()).filter(Boolean);
      postData.append('tags', JSON.stringify(tagsArray));
      if (coverImage) postData.append('cover_image', coverImage);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/blog`, postData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Basic ${authHeader}` },
      });

      if (extraMedia.length > 0) {
        const mediaData = new FormData();
        extraMedia.forEach((f) => mediaData.append('media', f));
        await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/${res.data.id}/media`, mediaData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Basic ${authHeader}` },
        });
      }

      setSuccess(true);
      resetForm();
      setTimeout(() => setSuccess(false), 3500);
    } catch (err) {
      console.error("Error creating post:", err);
      if (err.response?.status === 401) {
        handleLogout();
        alert("Session expired. Please log in again.");
      } else {
        alert("Failed to create post. Check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 md:p-12 rounded-[2rem] w-full max-w-md border border-surface-weak shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-t-[2rem]" />
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-cyan-500/20">
              <FaLock className="text-3xl text-cyan-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-space uppercase tracking-tighter">Admin Portal</h2>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-2 font-fira tracking-widest uppercase">
              Identity Verification Required
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="email" placeholder="Admin Email" required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full bg-surface border border-surface rounded-2xl pl-12 pr-4 py-3.5 text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all font-ibm-plex text-sm"
              />
            </div>
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="password" placeholder="Security Password" required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full bg-surface border border-surface rounded-2xl pl-12 pr-4 py-3.5 text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all font-ibm-plex text-sm"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-center gap-2 text-red-400 text-xs font-bold"
                >
                  <FaExclamationTriangle /> {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit" disabled={loginLoading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {loginLoading ? <FaSpinner className="animate-spin" /> : 'Enter Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-ink pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex justify-between items-end gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-[#06b6d4] uppercase mb-1">Story Editor</h2>
            <p className="text-gray-400 font-fira tracking-widest uppercase text-[10px] sm:text-xs">
              Crafting your next masterpiece
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-[10px] bg-surface hover:bg-red-500/10 px-4 py-2 rounded-full border border-surface text-gray-400 hover:text-red-400 transition-all font-bold uppercase tracking-widest"
          >
            Secure Exit
          </button>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-green-500/10 border border-green-500/30 p-4 rounded-2xl mb-8 flex items-center gap-3 text-green-400"
            >
              <FaCheckCircle className="text-xl shrink-0" />
              <span className="font-bold uppercase text-xs tracking-wider">Published successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8 glass p-6 sm:p-8 md:p-12 rounded-[2.5rem] border border-surface-weak relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-50" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Field label="Post Title">
                <input
                  type="text" name="title" required
                  value={formData.title} onChange={handleInputChange}
                  className="w-full bg-surface border border-surface rounded-2xl px-5 py-3.5 text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all font-space"
                  placeholder="The Future of Web 3.0"
                />
              </Field>

              <Field label="Quick Excerpt">
                <textarea
                  name="excerpt" rows={3}
                  value={formData.excerpt} onChange={handleInputChange}
                  className="w-full bg-surface border border-surface rounded-2xl px-5 py-3.5 text-white focus:border-cyan-400/50 focus:bg_white/10 outline-none transition-all text-sm font-ibm-plex resize-none"
                  placeholder="Summarize your story for the card preview..."
                />
              </Field>

              <Field label="Metadata Tags (comma-separated)">
                <input
                  type="text" name="tags"
                  value={formData.tags} onChange={handleInputChange}
                  className="w-full bg-surface border border-surface rounded-2xl px-5 py-3.5 text-white focus:border-cyan-400/50 focus:bg_white/10 outline-none transition-all text-sm font-fira"
                  placeholder="react, tutorial, architecture"
                />
              </Field>

              <label className="flex items-center gap-3 p-3 rounded-2xl bg-surface border border-surface-weak cursor-pointer">
                <input
                  type="checkbox" name="published"
                  checked={formData.published} onChange={handleInputChange}
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visible to World</span>
              </label>
            </div>

            <div className="space-y-6">
              <FileDrop
                label="Hero Image"
                name="cover_image"
                accept="image/*"
                onChange={handleFileChange}
                file={coverImage}
                icon={<FaUpload />}
                accent="cyan"
              />
              <FileDrop
                label="Story Gallery"
                accept="image/*,video/*"
                onChange={handleFileChange}
                file={extraMedia.length > 0 ? `${extraMedia.length} files` : null}
                icon={<FaPlus />}
                accent="blue"
              />
            </div>
          </div>

          <Field label="The Narrative (Markdown)">
            <textarea
              name="content" required rows={16}
              value={formData.content} onChange={handleInputChange}
              className="w-full bg-surface border border-surface rounded-2xl px-6 py-6 text-white focus:border-cyan-400/50 focus:bg_white/10 outline-none transition-all font-ibm-plex text-[15px] leading-relaxed resize-y"
              placeholder="# Write your heart out..."
            />
          </Field>

          <button
            type="submit" disabled={loading}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl ${
              loading
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]'
            }`}
          >
            {loading ? (
              <><FaSpinner className="animate-spin" /> Transmitting Data...</>
            ) : (
              'Establish Publication'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="block text-[10px] font-bold font-fira uppercase text-gray-500 mb-2 tracking-widest">
      {label}
    </label>
    {children}
  </div>
);

const FileDrop = ({ label, name, accept, onChange, file, icon, accent }) => {
  const ring = accent === 'cyan' ? 'hover:border-cyan-500/40' : 'hover:border-blue-500/40';
  const iconColor = accent === 'cyan' ? 'group-hover:text-cyan-400' : 'group-hover:text-blue-400';
  return (
    <div>
      <label className="block text-[10px] font-bold font-fira uppercase text-gray-500 mb-2 tracking-widest">
        {label}
      </label>
      <div className={`relative group cursor-pointer border-2 border-dashed border-white/10 rounded-3xl p-8 ${ring} transition-all text-center bg-white/[0.02]`}>
        <input
          type="file" name={name} multiple={!name} accept={accept}
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="relative z-0">
          <div className={`mx-auto text-3xl text-gray-700 ${iconColor} mb-3 transition-transform group-hover:-translate-y-0.5 inline-block`}>
            {icon}
          </div>
          <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest break-all">
            {file || `Select ${name === 'cover_image' ? 'Cover' : 'Photos/Videos'}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;
