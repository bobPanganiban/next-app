import Link from "next/link";
import React from "react";

const CreateNewButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <div className="mb-4">
      <button className="btn bg-slate-800 text-white btn-sm">
        <Link href={href}>{label}</Link>
      </button>
    </div>
  );
};

export default CreateNewButton;
