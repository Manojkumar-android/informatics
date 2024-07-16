import { useState } from 'react';

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({
    source: false,
    subject: false,
    documentType: false,
    publications: false,
    publishers: false,
  });

  const handleToggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleClearAll = () => {
    setOpenSections({
      source: false,
      subject: false,
      documentType: false,
      publications: false,
      publishers: false,
    });
  };

  const sections = [
    { label: 'Source', options: ['Journal Articles', 'Books in the Library', 'Other E-Resources'] },
    { label: 'Subject', options: ['Social  Management', 'Applied Science', 'Medical'] },
    { label: 'Document Type', options: ['Option 1', 'Option 2', 'Option 3'] },
    { label: 'Publications', options: ['Option 1', 'Option 2', 'Option 3'] },
    { label: 'Publishers', options: ['Option 1', 'Option 2', 'Option 3'] },
  ];

  return (
    <div className="w-[270px] p-4 bg-gray-100">
      {/* Top Part with Filter and Clear All */}
      <div className="bg-[#F58220] text-white p-4 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          <div>Filter</div>
        </div>
        <button className="text-white underline" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      {/* Expandable Sections */}
      {sections.map((section) => (
        <div key={section.label} className="mt-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() =>
              handleToggleSection(section.label.toLowerCase().replace(' ', ''))
            }
          >
            <label className="block text-black mb-2">
              {section.label}
            </label>
            <span className="text-black font-bold text-xl">
              {openSections[section.label.toLowerCase().replace(' ', '')] ? '-' : '+'}
            </span>
          </div>
          {openSections[section.label.toLowerCase().replace(' ', '')] && (
            <ul className="pl-4 text-[#717171]">
              {section.options.map((option) => (
                <li key={option} className="mb-1 flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
