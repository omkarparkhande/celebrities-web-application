import React, { useState, useEffect } from "react";
import ActionButtons from "./ActionButtons";

const Accordion = ({ id, title, email, imgSrc, dob, description, gender, country, activeAccordion, onAccordionToggle, onEdit, onDelete }) => {
  const isAccordionOpen = id === activeAccordion;
  const [editMode, setEditMode] = useState(false);
  const [editedGender, setEditedGender] = useState(gender);
  const [editedCountry, setEditedCountry] = useState(country);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedAge, setEditedAge] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch the list of countries
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((item) => item.name.common);
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const calculateAge = () => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    } else {
      return age;
    }
  };

  const handleContainerClick = () => {
    if (!editMode) {
      onAccordionToggle(id);
    }
  };

  // const handleEditClick = () => {
  //   setEditMode(true);
  //   setEditedAge(calculateAge()); // Initialize editedAge with the current calculated age
  // };

  const handleEditClick = () => {
    // Check if age is 18 or above before entering edit mode
    if (calculateAge() >= 18) {
      setEditMode(true);
      setEditedAge(calculateAge());
    } else {
      // Display a browser alert for users below 18
      alert("You must be 18 or above to edit your information.");
    }
  };

  
  
  const handleSaveClick = () => {
    // Save the edited data and exit edit mode
    onEdit(id, { gender: editedGender, country: editedCountry, description: editedDescription, dob: calculateBirthDate(editedAge) });
    setEditMode(false);
  };

  const handleCancelClick = () => {
    // Cancel the edit and exit edit mode
    setEditMode(false);
    // Reset edited values to their original state
    setEditedGender(gender);
    setEditedCountry(country);
    setEditedDescription(description);
    setEditedAge(null);
  };

  const handleDeleteClick = () => {
    // Prompt the user before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      onDelete(id);
    }
  };

  const calculateBirthDate = (editedAge) => {
    const today = new Date();
    const birthYear = today.getFullYear() - editedAge;
    const birthDate = new Date(birthYear, today.getMonth(), today.getDate());
    return birthDate.toISOString().split("T")[0];
  };

  return (
    <div className="py-2">
      <div className=" border-solid border-2 border-gray-300 rounded-2xl px-5 py-2">
      <div className="flex justify-between w-full">
        <div className="flex w-full">
          <div className="rounded-full w-20 overflow-hidden profile-img">
            <img src={imgSrc} alt="profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center ml-4">
            <span className="text-2xl pb-2">{title}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <svg className="fill-black-500 shrink-0 cursor-pointer" width="16" height="16" xmlns="http://www.w3.org/2000/svg" onClick={handleContainerClick}>
            <rect y="7" width="16" height="2" rx="1" className={`transform origin-center transition duration-200 ease-out ${isAccordionOpen && "!rotate-180"}`} />
            <rect y="7" width="16" height="2" rx="1" className={`transform origin-center rotate-90 transition duration-200 ease-out ${isAccordionOpen && "!rotate-180"}`} />
          </svg>
        </div>
      </div>
      <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${isAccordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          {isAccordionOpen && (
            <>
              {!editMode ? (
                <>
                <div className="flex justify-between py-2">
                  <div>
                    <p className="text-gray-400 font-medium">Age</p>
                    <p className="font-semibold">{`${calculateAge()} Years`}</p>
                  </div> 
                  <div>
                    <p className="text-gray-400 font-medium">Gender</p>
                    <p className="font-semibold">{gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-medium">Country</p>
                    <p className="font-semibold">{country}</p>
                  </div>
                </div>
                <div className="py-2">
                  <p className="text-gray-400 font-medium">Description</p>
                  <p className="font-semibold">{description}</p> 
                </div> 
                </>
              ) : (
                <>
                  <div className="flex justify-between py-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-400">Age</label>
                      <input type="text" value={editedAge} onChange={(e) => setEditedAge(e.target.value)}
                      className="p-1 border border-gray-300 rounded w-20" // Adjusted width
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400">Gender</label>
                      <select value={editedGender} onChange={(e) => setEditedGender(e.target.value)} 
                      className="p-1 border border-gray-300 rounded" >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                        <option value="rather not say">Rather not say</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400">Country</label>
                      <select value={editedCountry} onChange={(e) => setEditedCountry(e.target.value)}
                        className="p-1 border border-gray-300 rounded w-40" // Adjusted width
                      >
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div> 
                  
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-400">Description</label>
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="p-2 border border-gray-300 rounded w-full max-w-lg" // Adjusted width
                    ></textarea>
                  </div>
                </>
              )}
              <ActionButtons editMode={editMode} onEditClick={handleEditClick} onSaveClick={handleSaveClick} onCancelClick={handleCancelClick} onDeleteClick={() => onDelete(id)} />
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Accordion;
