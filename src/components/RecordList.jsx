import React from "react";
import Accordion from "./Accordion";

const RecordList = ({ records, activeAccordion, onAccordionToggle, onEdit, onDelete }) => {
  return (
    <>
      {records.map((record) => (
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
            onAccordionToggle={onAccordionToggle}
            onEdit={(id, updatedData) => onEdit(record.id, updatedData)}
            onDelete={() => onDelete(record.id)}
          />
        </div>
      ))}
    </>
  );
};

export default RecordList;
