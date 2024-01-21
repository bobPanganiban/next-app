import React from "react";

interface Props {
  params: { photoId: number; id: number };
}

const PhotoDetail = ({ params: { photoId, id } }: Props) => {
  return (
    <div>
      PhotoDetail {id} {photoId}
    </div>
  );
};

export default PhotoDetail;
