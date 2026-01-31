import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import PostCard from './PostCard';
import CreatePostModal from './CreatePostModal';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { MessageSquare } from 'lucide-react';

// Define the Post interface to match Supabase structure
interface Post {
  id: string;
  guest_name: string;
  content: string;
  media_url: string | null;
  media_type: string | null;
  created_at: string;
}

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch initial posts
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    } else if (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();

    // Realtime Subscription: Automatically adds new posts when they happen
    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        setPosts((prev) => [payload.new as Post, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Feed</h1>
          <p className="text-gray-500 mt-1 text-base">Connect with legal professionals and share your experiences.</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:from-blue-600 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>
      {showModal && <CreatePostModal onClose={() => setShowModal(false)} onPost={fetchPosts} />}
      {loading ? (
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      ) : (
        posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <MessageSquare className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-500 mb-2">No posts yet</h2>
            <p className="text-gray-400 mb-4">Be the first to share your legal experience or ask a question.</p>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" /> Create First Post
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )
      )}
    </div>
  );
};

export default CommunityFeed;