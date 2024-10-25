import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';



const FilterComponent = ({ filters, setFilters }) => {
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      companyTags: '',
      email: '',
      phone: '',
      tags: '',
      createdAt: '',
    });
  };

  return (
    <div className="mb-4 p-4 border rounded-md">
      <div className="grid grid-cols-3 gap-4">
        <Input
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <Input
          placeholder="Filter by quantity"
          value={filters.companyTags}
          onChange={(e) => handleFilterChange('companyTags', e.target.value)}
        />
        <Input
          placeholder="Filter by fertilizername"
          value={filters.email}
          onChange={(e) => handleFilterChange('email', e.target.value)}
        />
        <Input
          placeholder="Filter by Sold_at"
          value={filters.phone}
          onChange={(e) => handleFilterChange('phone', e.target.value)}
        />
        <Input
          placeholder="Filter by tags"
          value={filters.tags}
          onChange={(e) => handleFilterChange('tags', e.target.value)}
        />
        <Input
          placeholder="Filter by created date"
          value={filters.createdAt}
          onChange={(e) => handleFilterChange('createdAt', e.target.value)}
        />
      </div>
      <Button variant="outline" className="mt-2" onClick={clearFilters}>
        <X className="mr-2 h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterComponent;