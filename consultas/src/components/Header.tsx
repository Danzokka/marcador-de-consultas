import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { getSession } from "@/app/actions";
import UserDropdown from "./UserDropdown";

const Header = async () => {
  const user = await getSession();

  const pages = [
    { id: 1, name: "Home", href: "/" },
  ];
  return (
    <div className="flex justify-between items-center p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="logo" width={180} height={80} />
        </Link>
        <ul className="md:flex gap-8 hidden">
          {pages.map((page) => (
            <Link href={page.href} key={page.id}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                {page.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {user && user.user ? (
        <UserDropdown user={user.user} />
      ) : (
        <Button asChild className="bg-primary font-bold">
          <Link href="/auth/login">Entrar</Link>
        </Button>
      )}
    </div>
  );
};

export default Header;
