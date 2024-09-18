import Link from 'next/link'
import React from 'react'

interface AuthFooterProps{
    title:string;
    link:string;
}

export default function AuthFooter({title,link}:AuthFooterProps) {
  return (
    <div className="text-center sm:text-left whitespace-nowrap ">
    <div className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500  hover:underline ">
      <Link href={`/${link}`}>
        <span className="inline-block ml-1  hover:underline">{title}</span>
      </Link>
    </div>
  </div>
  )
}
