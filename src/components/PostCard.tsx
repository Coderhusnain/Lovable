import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { MessageSquare, User, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  id: string;
  guest_name: string;
  content: string;
  media_url: string | null;
  media_type: 'image' | 'video' | null;
  created_at: string;
}

interface Comment {
  id: string;
  guest_name: string;
  content: string;
  created_at: string;
}

export default function PostCard({ post }: { post: Post }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    if (data) setComments(data);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commentName.trim()) return;

    const { error } = await supabase
      .from('comments')
      .insert([{ post_id: post.id, guest_name: commentName, content: newComment }]);

    if (!error) {
      setNewComment('');
      fetchComments();
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{post.guest_name}</h3>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>

        <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>

        {post.media_url && (
          <div className="mb-4 rounded-lg overflow-hidden bg-black">
            {post.media_type === 'video' ? (
              <video src={post.media_url} controls className="w-full max-h-[400px] object-contain" />
            ) : (
              <img src={post.media_url} alt="Post media" className="w-full max-h-[400px] object-cover" />
            )}
          </div>
        )}

        <div className="border-t pt-3">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"
          >
            <MessageSquare className="w-4 h-4" />
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>
      </div>

      {showComments && (
        <div className="bg-gray-50 p-4 border-t">
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
            {comments.map((c) => (
              <div key={c.id} className="text-sm">
                <span className="font-bold">{c.guest_name}: </span>
                <span className="text-gray-700">{c.content}</span>
              </div>
            ))}
            {comments.length === 0 && <p className="text-xs text-gray-400">No comments yet.</p>}
          </div>

          <form onSubmit={handleCommentSubmit} className="space-y-2">
            <Input
              placeholder="Your Name"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="text-xs h-8"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="text-xs h-8"
              />
              <Button type="submit" size="sm" className="h-8 w-8 p-0">
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
