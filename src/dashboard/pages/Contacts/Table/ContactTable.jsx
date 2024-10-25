import  { useRef, useEffect } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from 'lucide-react';
import { useContactsTable } from './useContactsTable';
import ContactsTableRow from './ContactsTableRow';
import FilterComponent from './FilterComponent';

const ContactsTable = () => {
  const {
    contacts,
    selectedRows,
    isAllSelected,
    isPartiallySelected,
    handleSelectAll,
    filters,
    setFilters,
  } = useContactsTable();

  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.dataset.state = isPartiallySelected ? 'indeterminate' : isAllSelected ? 'checked' : 'unchecked';
    }
  }, [isAllSelected, isPartiallySelected]);

  return (
    <div>
      <FilterComponent filters={filters} setFilters={setFilters} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                ref={checkboxRef}
              />
            </TableHead>
            <TableHead>Name <ArrowUpDown className="inline ml-2 h-4 w-4" /></TableHead>
            <TableHead>Company Tags</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts?.map((contact,index) => (
            <ContactsTableRow 
              contact={contact}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <p>Selected Rows: {selectedRows.join(', ')}</p>
      </div>
    </div>
  );
};

export default ContactsTable;