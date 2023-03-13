import React from 'react';

const BackgroundImage = ({ imageUrl, children }: any) => {
  const styles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return <div style={styles}>{children}</div>;
};

export default BackgroundImage;
