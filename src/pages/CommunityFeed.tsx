import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Uses the shared client

// Inline PostCard component to avoid a missing external module.
const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</div>
      <div className="font-semibold text-gray-900">{post.guest_name}</div>
      <p className="mt-2 text-gray-700">{post.content}</p>
      {post.media_url && (
        post.media_type?.startsWith('image') ? (
          <img src={post.media_url} alt="post media" className="mt-3 rounded max-h-60 w-full object-cover" />
        ) : (
          <a href={post.media_url} className="text-blue-600 mt-3 block" target="_blank" rel="noreferrer">View attachment</a>
        )
      )}
    </div>
  );
};

const CreatePostModal: React.FC<{ onClose: () => void; onPost: () => Promise<void> | void }> = ({ onClose, onPost }) => {
  const [guestName, setGuestName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !content.trim()) return;
    setSubmitting(true);

    const { error } = await supabase.from('posts').insert([
      {
        guest_name: guestName.trim(),
        content: content.trim(),
      },
    ]);

    setSubmitting(false);

    if (error) {
      console.error('Error creating post:', error);
      return;
    }

    setGuestName('');
    setContent('');
    await onPost();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Your name"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share something..."
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';

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

  // Initial Fetch
  useEffect(() => {
    fetchPosts();

    // Realtime Subscription (Optional: updates feed automatically)
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

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else if (data) {
      setPosts(data);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header & Action Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Feed</h1>
          <p className="text-gray-500">Share your legal journey and experiences.</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="w-4 h-4" />
          New Post
        </Button>
      </div>

      {/* Modal */}
      {showModal && (
        <CreatePostModal 
          onClose={() => setShowModal(false)} 
          onPost={fetchPosts} 
        />
      )}

      {/* Feed Content */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-dashed">
              <p>No posts yet. Be the first to share!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;