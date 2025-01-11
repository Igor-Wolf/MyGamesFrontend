import React, { useState } from 'react';

const ReadMore = ({ text, limit = 400 }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <div>
      <p>
        {isReadMore ? text : `${text.substring(0, limit)}...`}
      </p>
      {text.length > limit && (
        <button onClick={() => setIsReadMore(!isReadMore)}>
          {isReadMore ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
