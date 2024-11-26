import React from 'react';

interface TeamMember {
  name: string;
  status: string;
  dates: string;
  avatar: string;
}

export const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center font-medium">
          {member.avatar}
        </div>
        <div>
          <div className="font-medium">{member.name}</div>
          <div className="text-sm text-purple-300">{member.dates}</div>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs 
        ${member.status === "On Leave" ? "bg-blue-500/20 text-blue-300" :
          member.status === "Upcoming" ? "bg-purple-500/20 text-purple-300" :
          "bg-green-500/20 text-green-300"}`}>
        {member.status}
      </span>
    </div>
  );
};