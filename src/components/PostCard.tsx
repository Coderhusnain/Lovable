import React, { useState, useEffect, useRef } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

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
      .insert([{ post_id: post.id, guest_name: commentName.trim(), content: newComment.trim() }]);

    if (!error) {
      setNewComment('');
      fetchComments();
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{post.guest_name}</h3>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        {post.media_url && (
          <div className="rounded-lg overflow-hidden bg-black max-h-[500px] flex justify-center">
            {post.media_type === 'video' ? (
              <video
                ref={videoRef}
                src={post.media_url}
                controls
                className="w-full max-h-[400px] object-contain"
                muted
                loop
                onMouseEnter={() => videoRef.current?.play()}
                onMouseLeave={() => videoRef.current?.pause()}
              />
            ) : (
              <img src={post.media_url} alt="Post media" className="w-full max-h-[400px] object-contain" />
            )}
          </div>
        )}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mt-2"
        >
          <MessageSquare className="w-4 h-4" />
          {showComments ? 'Hide Comments' : `Show Comments (${comments.length})`}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="bg-gray-50 p-4 border-t space-y-3">
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {comments.length === 0 && <p className="text-xs text-gray-400">No comments yet.</p>}
            {comments.map((c) => (
              <div key={c.id} className="text-sm">
                <span className="font-bold">{c.guest_name}: </span>
                <span className="text-gray-700">{c.content}</span>
              </div>
            ))}
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
