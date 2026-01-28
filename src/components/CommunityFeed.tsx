import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import PostCard from './PostCard';
import CreatePostModal from './CreatePostModal';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';

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
          <p className="text-gray-500">Share your legal journey and experiences.</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Create Post Modal */}
      {showModal && (
        <CreatePostModal 
          onClose={() => setShowModal(false)} 
          onPost={fetchPosts} // <--- FIXED: This missing prop caused the error
        />
      )}

      {/* Posts List */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg border border-dashed text-gray-500 shadow-sm">
          <p className="mb-2">No posts yet.</p>
          <p className="text-sm">Be the first to share your story!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;