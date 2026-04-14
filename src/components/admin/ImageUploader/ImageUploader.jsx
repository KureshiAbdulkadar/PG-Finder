import React, { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages].slice(0, 5));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="aspect-square relative rounded-button overflow-hidden group">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button 
                onClick={() => setImages(images.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-brand-red opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <label className="aspect-square border-2 border-dashed border-border rounded-card flex flex-col items-center justify-center cursor-pointer hover:bg-background transition-colors">
            <span className="material-symbols-outlined text-3xl text-text-muted">add_photo_alternate</span>
            <span className="text-[10px] font-bold text-text-secondary mt-2 uppercase">Add Photo</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )}
      </div>
      <p className="text-xs text-text-secondary">Max 5 photos. Supported: JPG, PNG, WEBP.</p>
    </div>
  );
};

export default ImageUploader;
