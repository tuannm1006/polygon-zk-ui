import { FC } from 'react';

export const FeedbackFloatingButton: FC<any> = () => {
  return (
    <a
      className="p-2 rounded-lg fixed right-10 bottom-10 backdrop-blur-lg bg-[#ffffff1f] flex flex-col items-center gap-2"
      href="https://airtable.com/shrwYp3jQar6inevI"
      target="_blank">
      <i className="octan-icon octan-icon--feedback" />
      <div className="font-medium">Feedback</div>
    </a>
  );
};
