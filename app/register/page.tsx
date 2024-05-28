// pages/register.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`/api/auth/register`, { email, password })
      .then((res) => router.push("/"))
      .catch((err) => {
        setLoading(false);
        setError("Account creation failed");
      });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="flex justify-center m-[20px]">
      <div className="flex-row border border-gray-200 w-[30%] max-w-[400px] shadow-lg p-[20px] justify-center">
        <h1 className="text-gray-800 text-lg font-semibold">Register</h1>
        <form onSubmit={handleSubmit} className="flex-row">
          <div className="mt-2">
            <p>Email:</p>
            <input
              className="input input-bordered input-md w-full"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <p>Password:</p>
            <input
              className="input input-bordered input-md w-full"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-bordered btn-md mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span>
                <Spinner />
                Creating Account
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
