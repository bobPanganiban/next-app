"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <button
        className="btn btn-lg btn-primary mt-8"
        onClick={(e) => router.push("/admin")}
      >
        GO TO ADMIN DASHBOARD
      </button>
    </div>
  );
}
