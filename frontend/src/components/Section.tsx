import React from 'react';

function Section({ title, items, sectionName, onEdit }) {
  const handleTextChange = (id, e) => {
    onEdit(sectionName, id, e.target.textContent);
  };

  return (
    <div className="section">
      <h2>{title}</h2>
      <ul>
        {items.map((item: { id: React.Key | null | undefined; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <li 
            key={item.id} 
            className="bullet-point" 
            contentEditable 
            onBlur={(e) => handleTextChange(item.id, e)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Section;
