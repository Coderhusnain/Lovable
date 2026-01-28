import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Props {
  onClose: () => void;
  onPost: () => void;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const CreatePostModal: React.FC<Props> = ({ onClose, onPost }) => {
  const [guestName, setGuestName] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!guestName.trim() || (!content.trim() && !file)) {
      setError('Please enter your name and some content or media.');
      return;
    }
    if (file && file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 50MB limit.');
      return;
    }
    let media_url = null;
    let media_type = null;
    if (file) {
      if (!file.type.startsWith('image') && !file.type.startsWith('video')) {
        setError('Only images and videos are allowed.');
        return;
      }
      setLoading(true);
      const { data, error: uploadError } = await supabase.storage
        .from('community-media')
        .upload(`${Date.now()}_${file.name}`, file, { upsert: false });
      if (uploadError) {
        setError('Upload failed.');
        setLoading(false);
        return;
      }
      // getPublicUrl returns an object like { data: { publicUrl: string } }
      const { data: publicUrlData } = supabase.storage
        .from('community-media')
        .getPublicUrl(data.path);
      media_url = publicUrlData?.publicUrl ?? null;
      media_type = file.type;
    }
    setLoading(true);
    const { error: insertError } = await supabase.from('posts').insert({
      guest_name: guestName,
      content,
      media_url,
      media_type,
    });
    setLoading(false);
    if (insertError) {
      setError('Failed to create post.');
      return;
    }
    setGuestName('');
    setContent('');
    setFile(null);
    onPost();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Create a Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border rounded px-2 py-1"
            placeholder="Your Name"
            value={guestName}
            onChange={e => setGuestName(e.target.value)}
            required
          />
          <textarea
            className="border rounded px-2 py-1"
            placeholder="Share your story..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={3}
          />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
