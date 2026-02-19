import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';
import { Button } from '@/components/ui/button';
import { Users, MessageSquarePlus } from 'lucide-react';

// Type for a post
interface Post {
  id: string;
  guest_name: string;
  content: string;
  media_url: string | null;
  media_type: 'image' | 'video' | null;
  created_at: string;
}

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    setDbError(null);
    try {
      const { data, error } = await supabase
        .from<Post>('posts') // <-- Type-safe generic
        .select('*')
        .order('created_at', { ascending: false });

      if (error) setDbError(`Database Error: ${error.message}`);
      else if (data) setPosts(data);
    } catch (err: any) {
      setDbError(`Connection Error: ${err.message}`);
    }
    setLoading(false);
  };

  // Realtime updates
  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') setPosts((prev) => [payload.new, ...prev]);
          else if (payload.eventType === 'UPDATE')
            setPosts((prev) => prev.map((p) => (p.id === payload.new.id ? payload.new : p)));
          else if (payload.eventType === 'DELETE')
            setPosts((prev) => prev.filter((p) => p.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 via-indigo-100/60 to-white flex items-center justify-center py-8">
      <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 border border-blue-200/40 backdrop-blur-md mx-2">
        
        {/* Header */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-600 p-4 rounded-full shadow-lg">
              <Users className="w-9 h-9 text-white drop-shadow" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2 tracking-tight drop-shadow">
                Community
              </h1>
              <p className="text-indigo-700 text-lg md:text-xl font-medium mb-1">
                Welcome to the Legalgram Community!
              </p>
              <p className="text-blue-700 text-base md:text-lg">
                Share your legal journey, ask questions, and connect with others. This is a safe, supportive space for everyone.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-7 py-3 rounded-xl shadow-xl hover:from-blue-600 hover:to-indigo-700 text-lg font-semibold border-2 border-blue-200/40"
            size="lg"
          >
            <MessageSquarePlus className="w-6 h-6" /> New Post
          </Button>

          <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-200 via-indigo-200 to-white rounded-full blur-2xl opacity-40 pointer-events-none" />
        </div>

        {/* Modal */}
        {showModal && <CreatePostModal onClose={() => setShowModal(false)} onPost={fetchPosts} />}

        {/* Feed */}
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        ) : dbError ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-red-500">{dbError}</p>
            <Button onClick={fetchPosts} className="mt-4 bg-blue-600 hover:bg-blue-700">
              Retry Connection
            </Button>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-blue-500 mb-2">No posts yet</p>
            <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Create First Post
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
