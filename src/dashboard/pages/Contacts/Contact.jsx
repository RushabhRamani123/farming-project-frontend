import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Plus } from 'lucide-react';
import ContactsTable from './Table/ContactTable';
import CreateContactDrawer from './ContactDrawer/CreateContactDrawer';
const Header = () => (
  <div className="flex justify-between items-center mb-4">
    <div className="space-x-2">
      <h1 className="text-[2rem] font-bold">Contacts</h1>
    </div>
    <Button variant="outline" className="flex items-center">
     <Filter className="mr-2 h-4 w-4" /> Filter
    </Button>
  </div>
);
const ActionBar = ({ onAddContact }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center space-x-2">
      <Input placeholder="Search..." className="w-64" />
      <Search className="text-gray-400" />
    </div>
    <div className="space-x-2">
      <Button variant="outline">Export</Button>
      <Button variant="outline">Import</Button>
      <Button className="bg-blue-500 text-white" onClick={onAddContact}>
        <Plus className="mr-2 h-4 w-4" /> Add Contact
      </Button>
    </div>
  </div>
);
const ContactsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <Header />
      <ActionBar onAddContact={() => setIsDrawerOpen(true)} />
      <ContactsTable />
      <CreateContactDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};
export default ContactsPage;