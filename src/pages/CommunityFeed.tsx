
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';
import { Button } from '@/components/ui/button';
import { Users, MessageSquarePlus } from 'lucide-react';

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    // Realtime updates
    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        setPosts((prev) => [payload.new, ...prev]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-100/60 via-indigo-100/60 to-white py-12 px-2 md:px-0">
      <div className="max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-6 md:p-12 border border-blue-200/40 backdrop-blur-md">
        {/* Community Header */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-600 p-4 rounded-full shadow-lg">
              <Users className="w-9 h-9 text-white drop-shadow" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2 tracking-tight drop-shadow">Community</h1>
              <p className="text-indigo-700 text-lg md:text-xl font-medium mb-1">Welcome to the Legalgram Community!</p>
              <p className="text-blue-700 text-base md:text-lg">Share your legal journey, ask questions, and connect with others. This is a safe, supportive space for everyone.</p>
            </div>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-7 py-3 rounded-xl shadow-xl hover:from-blue-600 hover:to-indigo-700 text-lg font-semibold border-2 border-blue-200/40"
            size="lg"
          >
            <MessageSquarePlus className="w-6 h-6" /> New Post
          </Button>
          {/* Decorative Accent */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-200 via-indigo-200 to-white rounded-full blur-2xl opacity-40 pointer-events-none" />
        </div>

        {/* Modal for Creating Post */}
        {showModal && (
          <CreatePostModal onClose={() => setShowModal(false)} onPost={fetchPosts} />
        )}

        {/* Feed Content */}
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-blue-100 rounded-full p-6 mb-4">
              <MessageSquarePlus className="w-10 h-10 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-blue-500 mb-2">No posts yet</h2>
            <p className="text-blue-400 mb-4">Be the first to share your legal experience or ask a question.</p>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-indigo-700"
            >
              <MessageSquarePlus className="w-4 h-4 mr-2" /> Create First Post
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;