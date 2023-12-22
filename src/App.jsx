import React, { useState } from "react";
import Records from "./data/celebrities.json";
import Accordion from "./components/Accordion";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import SearchInput from "./components/SearchInput";


export default function App() {
  const [contacts, setContacts] = useState(Records);
  const [originalContacts, setOriginalContacts] = useState(Records);
  const [search, setSearch] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Function to filter records based on the search query
  const handleSearch = (query) => {
    setSearch(query);

    // Use originalContacts if the query is empty
    const sourceContacts = query.trim() === "" ? originalContacts : contacts;

    // If the query is not empty, filter users based on the search query
    const filteredContacts = sourceContacts.filter((record) => {
      const fullName = `${record.first} ${record.last}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });

    // Update contacts to reflect the changes
    setContacts(filteredContacts);

    // Reset activeAccordion when performing a new search
    setActiveAccordion(null);
  };

  // Function to toggle the active accordion
  const handleAccordionToggle = (accordionId) => {
    setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
  };

  // Function to handle edit action
  const handleEdit = (id, updatedData) => {
    // Find the contact by id and update the data
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, ...updatedData };
      }
      return contact;
    });

    // Update both contacts and originalContacts to reflect the changes
    setContacts(updatedContacts);
    setOriginalContacts(updatedContacts);
  };

  // Function to handle delete action
  const handleDelete = (id) => {
    // Set the user to delete and show the confirmation dialog
    setUserToDelete(id);
    setShowDeleteConfirmation(true);
  };

  // Function to confirm delete
  const confirmDelete = () => {
    // Remove the contact with the specified id from the contacts state
    const updatedContacts = contacts.filter((contact) => contact.id !== userToDelete);
    setContacts(updatedContacts);

    // Close the confirmation dialog
    setShowDeleteConfirmation(false);

    // Clear the user to delete
    setUserToDelete(null);
  };

  // Function to cancel delete
  const cancelDelete = () => {
    // Clear the user to delete and hide the confirmation dialog
    setUserToDelete(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="App flex flex-col px-96 py-5">
      <h1 className="font-semibold text-2xl mb-4">List View</h1>
      {/* Search Input */}
      <SearchInput value={search} onChange={handleSearch} />

      {/* Display Records */}
      {contacts.map((record) => (
        <div key={record.id}>
          <Accordion
            id={record.id}
            title={`${record.first} ${record.last}`}
            imgSrc={record.picture}
            dob={record.dob}
            description={record.description}
            country={record.country}
            gender={record.gender}
            activeAccordion={activeAccordion}
            onAccordionToggle={handleAccordionToggle}
            onEdit={(id, updatedData) => handleEdit(record.id, updatedData)}
            onDelete={() => handleDelete(record.id)}
          />
        </div>
      ))}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && (
        <DeleteConfirmationDialog onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
}
