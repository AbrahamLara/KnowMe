import React from 'react';
import SectionItem from './SectionItem';

export default function SectionList(props) {
  const { isEditable, sectionIndex, list } = props;

  return (
    <div>
      <ul className='pl-4'>
        {list.map((text, i) => (
          <SectionItem
            key={i}
            isEditable={isEditable}
            index={i}
            sectionIndex={sectionIndex}
            text={text}
          />
        ))}
      </ul>
    </div>
  );
};