import { useState, useMemo } from 'react';
import { useContactStore } from '../../../../app/contactStore';
export const useContactsTable = () => {
  const { Details: allContacts, userId, deleteContact, updateContact } = useContactStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedContact, setEditedContact] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    companyTags: '',
    email: '',
    phone: '',
    tags: '',
    createdAt: '',
  });

  const contacts = useMemo(() => {
    return allContacts.filter(contact => 
      contact.name &&
      contact.phone &&
      contact.email &&
      contact.createdAt &&
      contact.companyTags &&
      contact.tags.length > 0
    ).filter(contact => {
      return (
        contact.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (Array.isArray(contact.companyTags) 
          ? contact.companyTags.some(tag => tag.toLowerCase().includes(filters.companyTags.toLowerCase()))
          : contact.companyTags.toLowerCase().includes(filters.companyTags.toLowerCase())) &&
        contact.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        contact.phone.toLowerCase().includes(filters.phone.toLowerCase()) &&
        contact.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase())) &&
        contact.createdAt.includes(filters.createdAt)
      );
    });
  }, [allContacts, filters]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(contacts.map((_, index) => `${userId}-${index}`));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index, checked) => {
    const rowId = `${userId}-${index}`;
    if (checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    }
  };

  const handleDelete = (index) => {
    deleteContact(index);
  };

  const handleEdit = (index) => {
    setEditingRow(index);
    const contactToEdit = { ...contacts[index] };
    contactToEdit.companyTags = Array.isArray(contactToEdit.companyTags) 
      ? contactToEdit.companyTags 
      : contactToEdit.companyTags ? [contactToEdit.companyTags] : [];
    setEditedContact(contactToEdit);
  };

  const handleSave = () => {
    if (editingRow !== null && editedContact) {
      const updatedContact = {
        ...editedContact,
        companyTags: Array.isArray(editedContact.companyTags) 
          ? editedContact.companyTags 
          : editedContact.companyTags.split(',').map((tag) => tag.trim())
      };
      updateContact(editingRow, updatedContact);
      setEditingRow(null);
      setEditedContact(null);
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedContact(null);
  };

  const handleInputChange = (field, value) => {
    if (editedContact) {
      if (field === 'companyTags' || field === 'tags') {
        const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        setEditedContact({ ...editedContact, [field]: tags });
      } else {
        setEditedContact({ ...editedContact, [field]: value });
      }
    }
  };

  const isAllSelected = selectedRows.length === contacts.length;
  const isPartiallySelected = selectedRows.length > 0 && selectedRows.length < contacts.length;

  const isSaveDisabled = editedContact
    ? Object.entries(editedContact).some(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length === 0;
        }
        return typeof value === 'string' && value.trim() === '';
      })
    : true;

  return {
    contacts,
    selectedRows,
    editingRow,
    editedContact,
    isAllSelected,
    isPartiallySelected,
    isSaveDisabled,
    filters,
    setFilters,
    handleSelectAll,
    handleSelectRow,
    handleDelete,
    handleEdit,
    handleSave,
    handleCancel,
    handleInputChange,
    userId
  };
};