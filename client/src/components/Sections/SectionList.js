import React from 'react';
import SectionItem from './SectionItem';

export default function SectionList(props) {
  const { isEditable, list } = props;

  return (
    <div>
      <ul className='pl-4'>
        {list.map((text, i) => (
          <SectionItem
            key={i}
            isEditable={isEditable}
            index={i}
            text={text}
          />
        ))}
      </ul>
    </div>
  );
};