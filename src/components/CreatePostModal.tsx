import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Upload, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface CreatePostModalProps {
  onClose: () => void;
  onPost: () => void;
}

export default function CreatePostModal({ onClose, onPost }: CreatePostModalProps) {
  const [guestName, setGuestName] = useState('');
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!guestName.trim() || !content.trim()) {
      toast.error("Name and Content are required");
      return;
    }

    setLoading(true);
    try {
      let mediaUrl = null;
      let mediaType = null;

      // 1. Handle Media Upload (if a file is selected)
      if (mediaFile) {
        const fileExt = mediaFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('community-media') // Ensure this bucket exists in your Supabase Storage
          .upload(fileName, mediaFile);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          // If bucket doesn't exist, we just skip media upload to prevent crash
          toast.warning("Could not upload image. Posting text only.");
        } else {
          const { data } = supabase.storage
            .from('community-media')
            .getPublicUrl(fileName);
          
          mediaUrl = data.publicUrl;
          mediaType = mediaFile.type.startsWith('video') ? 'video' : 'image';
        }
      }

      // 2. Insert Post Data into Database
      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            guest_name: guestName,
            content: content,
            media_url: mediaUrl,
            media_type: mediaType,
          },
        ]);

      if (insertError) throw insertError;

      toast.success("Post shared successfully!");
      onPost(); // Trigger feed refresh
      onClose(); // Close modal
    } catch (error: any) {
      console.error('Error posting:', error);
      toast.error(error.message || "Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-1 text-gray-900">Share Your Story</h2>
        <p className="text-sm text-gray-500 mb-6">Tell the community about your legal journey.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="guestName">Your Name (Public)</Label>
            <Input 
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. John Doe"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Your Story</Label>
            <Textarea 
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="resize-none"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="media">Attach Media (Optional)</Label>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer relative">
              <input 
                id="media"
                type="file" 
                accept="image/*,video/*"
                onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={loading}
              />
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Upload className="w-4 h-4" />
                {mediaFile ? (
                  <span className="text-blue-600 font-medium truncate max-w-[200px]">{mediaFile.name}</span>
                ) : (
                  <span>Click to upload image or video</span>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-2" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Post Story
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}