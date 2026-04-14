import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import properties from '../../data/properties.json';
import { Link } from 'react-router-dom';
import PropertyTableSkeleton from '../../components/common/Skeletons/PropertyTableSkeleton';

const ManagePropertiesPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-6 md:py-12 bg-background/50 min-h-screen">
      <PageWrapper>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Manage Properties</h1>
          <Link
            to="/admin/properties/add"
            className="bg-text-primary text-white px-6 py-2.5 rounded-button font-bold flex items-center gap-2 hover:bg-black transition-all max-w-fit"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Add Property
          </Link>
        </div>

        {loading ? (
          <PropertyTableSkeleton />
        ) : (
          <div className="bg-white border border-border rounded-card shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Property</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Type</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Price</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {properties.map((p) => (
                    <tr key={p.id} className="hover:bg-background/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 min-w-[180px]">
                          <img
                            src={p.images?.thumbnail || 'https://picsum.photos/id/101/100/100'}
                            alt=""
                            className="w-12 h-12 object-cover rounded-button shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-sm truncate">{p.title}</p>
                            <p className="text-xs text-text-secondary truncate">{p.location.area}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{p.type}</td>
                      <td className="px-6 py-4 text-sm font-bold">₹{p.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-pill text-[10px] font-bold uppercase ${p.isAvailable ? 'bg-success/10 text-success' : 'bg-text-muted/10 text-text-muted'}`}>
                          {p.isAvailable ? 'Available' : 'Sold Out'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/properties/edit/${p.id}`}
                            className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-full transition-colors"
                          >
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </Link>
                          <button className="text-brand-red hover:bg-brand-red/10 p-1.5 rounded-full transition-colors">
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border bg-background/5 text-center text-xs text-text-secondary font-medium">
              Showing {properties.length} listings
            </div>
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default ManagePropertiesPage;
