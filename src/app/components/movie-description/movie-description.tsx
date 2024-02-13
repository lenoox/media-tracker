import React from "react";

export const MovieDescription = ({
  label,
  children,
}: {
  label: string;
  children: any;
}) => {
  return (
    <div className="text-sm">
      <span className="text-lg text-gray-800 dark:text-stone-100">{label}</span>
      <div className="text-md ml-2 text-gray-800 dark:text-stone-300">
        {children}
      </div>
    </div>
  );
};
