import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/apiClient';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import imageCompression from 'browser-image-compression';
import { toast } from 'sonner';
import { FaSpinner } from 'react-icons/fa';

const PostBlog = () => {
  const navigate = useNavigate();
  const { setLoading } = useApp();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const quillRef = useRef(null);

  const clearForm = () => {
    setTitle('');
    setContent('');
    setImages([]);
    setPreviewImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear file input
    }
    if (quillRef.current) {
      quillRef.current.getEditor().setText(''); // Clear Quill editor
    }
  };

  // Memoize the Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        ['link'],
        [{ 'align': [] }],
        ['clean']
      ]
    },
    clipboard: {
      matchVisual: false
    }
  }), []);

  const formats = useMemo(() => [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link',
    'align'
  ], []);

  const handleContentChange = useCallback((content) => {
    setContent(content);
  }, []);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,              // Max file size in MB
      maxWidthOrHeight: 1920,    // Max width/height in pixels
      useWebWorker: true,        // Use web worker for better performance
    };
    
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      return file; // Return original file if compression fails
    }
  };

  const convertImageToDataURL = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = useCallback(async (e) => {
    const files = Array.from(e.target.files);
    
    // Preview images
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
    
    // Store actual files
    setImages(prev => [...prev, ...files]);
  }, []);

  const removeImage = useCallback((index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || images.length === 0) {
      toast.error('Please fill in all fields and upload at least one image');
      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    try {
      // Compress and convert images to data URLs
      const compressedImages = await Promise.all(
        images.map(async (image) => {
          const compressed = await compressImage(image);
          const dataUrl = await convertImageToDataURL(compressed);
          return dataUrl; // This will be a base64 string
        })
      );

      const blogData = {
        title,
        content,
        images: compressedImages // Array of base64 strings
      };

      await api.createBlog(blogData);
      toast.success('Blog posted successfully!');
      clearForm();
      navigate('/blog');
    } catch (error) {
      toast.error(error.message || 'Failed to post blog. Please try again.');
      console.error('Error submitting blog:', error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-28 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your blog title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg 
                       hover:border-blue-500 transition-colors duration-200 text-gray-600
                       disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Click to upload images
            </button>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {previewImages.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white 
                             rounded-full p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <svg className="h-4 w-4" fill="none" strokeLinecap="round" 
                         strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" 
                         stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Content
            </label>
            <div className="h-64">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={handleContentChange}
                modules={modules}
                formats={formats}
                className="h-full"
                preserveWhitespace
                readOnly={isSubmitting}
              />
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg 
                       hover:bg-blue-700 transition duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin h-5 w-5" />
                  <span>Publishing...</span>
                </>
              ) : (
                <span>Publish Blog Post</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostBlog;







