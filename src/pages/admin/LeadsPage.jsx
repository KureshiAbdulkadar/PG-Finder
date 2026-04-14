import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import properties from '../../data/properties.json';
import PropertyTableSkeleton from '../../components/common/Skeletons/PropertyTableSkeleton';

const initialLeads = [
  { id: 1, name: 'Tanvir Ahmed', phone: '+91 99887 76655', propertyId: 'pg-001', date: '2026-04-14', status: 'New' },
  { id: 2, name: 'Priya Sharma', phone: '+91 88776 65544', propertyId: 'pg-002', date: '2026-04-13', status: 'Contacted' },
  { id: 3, name: 'Rahul Gupta', phone: '+91 77665 44332', propertyId: 'pg-005', date: '2026-04-12', status: 'Closed' },
];

const LeadsPage = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  return (
    <div className="py-6 md:py-12 bg-background/50 min-h-[calc(100vh-80px)] md:min-h-screen pb-32">
      <PageWrapper>
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Contact Leads</h1>

        {loading ? (
          <PropertyTableSkeleton />
        ) : (
          <div className="bg-white border border-border rounded-card shadow-sm overflow-hidden min-h-[60vh]">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">User</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Property</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leads.map((lead) => {
                    const property = properties.find(p => p.id === lead.propertyId);
                    return (
                      <tr key={lead.id} className="hover:bg-background/20 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-sm">{lead.name}</p>
                            <p className="text-xs text-text-secondary">{lead.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm max-w-xs truncate">
                          {property?.title || 'Unknown Property'}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {lead.date}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-pill text-[10px] font-bold uppercase ${
                            lead.status === 'New' ? 'bg-blue-100 text-blue-600' :
                            lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-success/10 text-success'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className="border border-border rounded-md px-2 py-1 text-sm bg-white outline-none focus:border-text-primary transition-colors cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default LeadsPage;
