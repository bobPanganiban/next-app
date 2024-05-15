"use client";
import Link from "next/link";

interface Props {
  href: string;
  value: string;
}

const ProfileLink = ({ href, value }: Props) => {
  return <Link href={href}>{value}</Link>;
};

export default ProfileLink;
