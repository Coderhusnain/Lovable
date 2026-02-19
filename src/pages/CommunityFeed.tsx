import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';
import { Button } from '@/components/ui/button';
import { Users, MessageSquarePlus } from 'lucide-react';

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Fetch posts with user info
  const fetchPosts = async () => {
    setLoading(true);
    setDbError(null);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*, users(*)') // fetch user relation
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setDbError(`Database Error: ${error.message}. Make sure to run the migration SQL in Supabase SQL Editor.`);
      } else if (data) {
        setPosts(data);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setDbError(`Connection Error: ${err.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();

    // Realtime subscription for new posts
    const channel = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        async (payload) => {
          try {
            // Fetch full post with user relation
            const { data, error } = await supabase
              .from('posts')
              .select('*, users(*)')
              .eq('id', payload.new.id)
              .single();

            if (error) {
              console.error('Error fetching new post details:', error);
              return;
            }

            setPosts((prev) => [data, ...prev]);
          } catch (err) {
            console.error('Error fetching new post:', err);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 via-indigo-100/60 to-white flex items-center justify-center py-8">
      <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 border border-blue-200/40 backdrop-blur-md mx-2">
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
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-200 via-indigo-200 to-white rounded-full blur-2xl opacity-40 pointer-events-none" />
        </div>

        {/* Modal */}
        {showModal && <CreatePostModal onClose={() => setShowModal(false)} onPost={fetchPosts} />}

        {/* Feed Content */}
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        ) : dbError ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-red-100 rounded-full p-6 mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Database Setup Required</h2>
            <p className="text-red-500 mb-4 text-center max-w-md">{dbError}</p>
            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 max-w-lg">
              <p className="font-semibold mb-2">To fix this:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to your Supabase Dashboard</li>
                <li>Open SQL Editor</li>
                <li>Run the migration from: <code className="bg-gray-200 px-1 rounded">supabase/migrations/20250725000000_community_anonymous_access.sql</code></li>
              </ol>
            </div>
            <Button onClick={fetchPosts} className="mt-4 bg-blue-600 hover:bg-blue-700">
              Retry Connection
            </Button>
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
