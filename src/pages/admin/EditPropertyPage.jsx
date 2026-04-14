import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import properties from '../../data/properties.json';

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);

  if (!property) return <div className="p-10 text-center">Property not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Property updated successfully (Mock)');
    navigate('/admin/properties');
  };

  return (
    <div className="py-12">
      <PageWrapper className="max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate(-1)} className="hover:bg-background p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h1 className="text-3xl font-bold">Edit Property</h1>
        </div>

        <div className="bg-white border border-border rounded-card p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic Info */}
            <section>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-background">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Listing Title</label>
                  <input type="text" defaultValue={property.title} className="w-full border border-border rounded-input px-4 py-3" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select className="w-full border border-border rounded-input px-4 py-3 bg-white" defaultValue={property.category}>
                    <option>Girls Only</option>
                    <option>Boys Only</option>
                    <option>Unisex / Couple</option>
                    <option>AC Room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Room Type</label>
                  <input type="text" defaultValue={property.type} className="w-full border border-border rounded-input px-4 py-3" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Monthly Rent (₹)</label>
                  <input type="number" defaultValue={property.price} className="w-full border border-border rounded-input px-4 py-3" required />
                </div>
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-background">Location Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Area / Locality</label>
                  <input type="text" defaultValue={property.location.area} className="w-full border border-border rounded-input px-4 py-3" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Nearest Landmark</label>
                  <input type="text" defaultValue={property.location.landmark} className="w-full border border-border rounded-input px-4 py-3" required />
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-background">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['WiFi', 'AC', 'Meals', 'Laundry', 'Parking', 'CCTV', 'Power Backup', 'Gym'].map(item => (
                  <label key={item} className="flex items-center gap-3 p-3 border border-border rounded-button cursor-pointer hover:bg-background transition-colors">
                    <input type="checkbox" defaultChecked={property.amenities.includes(item.toLowerCase())} className="w-5 h-5 accent-brand-red" />
                    <span className="text-sm font-medium">{item}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="pt-6 border-t border-border flex justify-end gap-4">
               <button type="button" onClick={() => navigate(-1)} className="px-8 py-3 rounded-button font-bold border border-border hover:bg-background transition-colors">
                  Cancel
               </button>
               <button type="submit" className="bg-text-primary text-white px-10 py-3 rounded-button font-bold shadow-md active:scale-95 transition-all">
                  Save Changes
               </button>
            </div>
          </form>
        </div>
      </PageWrapper>
    </div>
  );
};

export default EditPropertyPage;
