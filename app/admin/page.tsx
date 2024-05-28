"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useUserProfile } from "../hooks/useUserProfile";

const AdminPage = () => {
  const { status, data: session } = useSession();
  const user = useUserProfile(session?.user?.email || "");
  return (
    <div>
      {!user?.data?.data.role && (
        <p>
          You do not have any authorization. Please contact system admin to
          request for a Role.
        </p>
      )}
    </div>
  );
};

export default AdminPage;
