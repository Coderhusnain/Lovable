import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Post {
  id: string;
  guest_name: string;
  content: string;
  media_url: string | null;
  media_type: string | null;
  created_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  guest_name: string;
  content: string;
  created_at: string;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  async function fetchComments() {
    setLoading(true);
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    setComments(data || []);
    setLoading(false);
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestName.trim() || !comment.trim()) return;
    setLoading(true);
    await supabase.from('comments').insert({
      post_id: post.id,
      guest_name: guestName,
      content: comment,
    });
    setComment('');
    setGuestName('');
    fetchComments();
    setLoading(false);
  }

  function renderMedia() {
    if (!post.media_url) return null;
    if (post.media_type?.startsWith('image')) {
      return <img src={post.media_url} alt="post media" className="rounded w-full max-h-80 object-cover" />;
    }
    if (post.media_type?.startsWith('video')) {
      return <video src={post.media_url} controls className="rounded w-full max-h-80" />;
    }
    return null;
  }

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
      <div className="font-semibold text-blue-700">{post.guest_name}</div>
      <div className="text-gray-800 whitespace-pre-line">{post.content}</div>
      {renderMedia()}
      <div className="text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</div>
      <button
        className="text-blue-600 text-sm mt-2"
        onClick={() => {
          setShowComments((v) => !v);
          if (!showComments) fetchComments();
        }}
      >
        {showComments ? 'Hide Comments' : 'Add/View Comments'}
      </button>
      {showComments && (
        <div className="mt-2">
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-1 mb-2">
            <input
              className="border rounded px-2 py-1 text-sm"
              placeholder="Your Name"
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              required
            />
            <textarea
              className="border rounded px-2 py-1 text-sm"
              placeholder="Write a comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-2 py-1 text-sm mt-1"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
          <div className="space-y-1">
            {comments.map((c) => (
              <div key={c.id} className="bg-gray-100 rounded p-2 text-sm">
                <span className="font-semibold text-blue-600">{c.guest_name}:</span> {c.content}
                <div className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</div>
              </div>
            ))}
            {comments.length === 0 && <div className="text-xs text-gray-400">No comments yet.</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
