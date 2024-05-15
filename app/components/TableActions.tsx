"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

interface Props {
  targetId: number;
  edit: string;
  onDelete?: (id: number) => void;
}

const TableActions = ({ targetId, edit, onDelete }: Props) => {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <FaPencilAlt
        color="#00a2c7"
        onClick={() => router.push(edit)}
        className="cursor-pointer"
      />
      {onDelete && (
        <FaTrashCan color="#f22f22" onClick={() => onDelete(targetId)} />
      )}
    </div>
  );
};

export default TableActions;
