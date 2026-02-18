"use client"

import { Input } from "@/components/atoms"
import { SearchIcon } from "@/icons"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { redirect } from "next/navigation"

export const HeaderSearch = ({
  placeholder = "Sök efter produkter",
}: {
  placeholder?: string
}) => {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("query") || "")

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search) {
      redirect(`/categories?query=${encodeURIComponent(search)}`)
    } else {
      redirect(`/categories`)
    }
  }

  return (
    <form className="w-full" method="POST" onSubmit={submitHandler}>
      <div className="w-full max-w-[720px] mx-auto">
        <Input
          icon={<SearchIcon />}
          placeholder={placeholder}
          value={search}
          changeValue={setSearch}
        />
      </div>
      <input type="submit" className="hidden" />
    </form>
  )
}
