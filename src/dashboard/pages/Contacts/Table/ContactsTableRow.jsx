import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { MoreVertical, Trash, Edit, Check, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContactsTable } from './useContactsTable';


const ContactsTableRow = ({ contact, index }) => {
  const {
    selectedRows,
    editingRow,
    editedContact,
    isSaveDisabled,
    handleSelectRow,
    handleDelete,
    handleEdit,
    handleSave,
    handleCancel,
    handleInputChange,
    userId
  } = useContactsTable();

  return (
    <TableRow>
      <TableCell>
        <Checkbox 
          checked={selectedRows.includes(`${userId}-${index}`)}
          onCheckedChange={(checked) => handleSelectRow(index,checked)}
        />
      </TableCell>
      <TableCell className="font-medium">
        {editingRow === index ? (
          <Input
            value={editedContact?.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        ) : (
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              {contact.name[0].toUpperCase()}
            </span>
            {contact.name}
          </div>
        )}
      </TableCell>
      <TableCell>
        {editingRow === index ? (
          <Input
            value={Array.isArray(editedContact?.companyTags) ? editedContact.companyTags.join(', ') : ''}
            onChange={(e) => handleInputChange('companyTags', e.target.value)}
          />
        ) : (
          Array.isArray(contact.companyTags) ? contact.companyTags.join(', ') : ''
        )}
      </TableCell>
      <TableCell>
        {editingRow === index ? (
          <Input
            value={editedContact?.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        ) : (
          contact.email
        )}
      </TableCell>
      <TableCell>
        {editingRow === index ? (
          <Input
            value={editedContact?.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        ) : (
          contact.phone
        )}
      </TableCell>
      <TableCell>
        {editingRow === index ? (
          <Input
            value={Array.isArray(editedContact?.tags) ? editedContact.tags.join(', ') : ''}
            onChange={(e) => handleInputChange('tags', e.target.value)}
          />
        ) : (
          Array.isArray(contact.tags) ? contact.tags.join(', ') : ''
        )}
      </TableCell>
      <TableCell>{contact.createdAt}</TableCell>
      <TableCell>
        {editingRow === index ? (
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={handleSave} disabled={isSaveDisabled}>
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleEdit(index)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(index)}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ContactsTableRow;
