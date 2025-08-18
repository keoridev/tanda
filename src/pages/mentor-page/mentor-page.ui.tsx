import React from "react";
import { MentorDetailPage } from "~features/detail-mentor";
import { ScrollTop } from "~shared/lib";
import { useParams } from "react-router-dom";
export const MentorPage: React.FC = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  return (
    <div>
      <ScrollTop />
      <MentorDetailPage mentorId={mentorId} />
    </div>
  );
};
