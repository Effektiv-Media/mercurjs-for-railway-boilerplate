"use client"

import { Input } from "@/components/atoms"
import { SearchIcon } from "@/icons"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { redirect } from "next/navigation"

export const NavbarSearch = ({
  placeholder = "Sök på Clickfynd",
}: {
  placeholder?: string
}) => {
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("query") || "")

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search) {
      redirect(`/categories?query=${search}`)
    } else {
      redirect(`/categories`)
    }
  }

  return (
    <form
      className="flex items-center w-full"
      method="POST"
      onSubmit={submitHandler}
    >
      <Input
        icon={<SearchIcon />}
        placeholder={placeholder}
        value={search}
        changeValue={setSearch}
        className="w-full rounded-full border-fuchsia-200 bg-fuchsia-50/60 text-center text-lg font-medium text-slate-900 placeholder:text-slate-500 focus:border-violet-300"
      />
      <input type="submit" className="hidden" />
    </form>
  )
}
