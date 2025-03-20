// src/components/CustomAccordion/CustomAccordion.tsx
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './CustomAccordian.css';

interface CustomAccordionProps {
  title: string;
  children: React.ReactNode;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  children,
}) => {
  return (
    <Accordion style={{ backgroundColor: '#272e3c' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <h2 className="accoridon-title">{title}</h2>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
