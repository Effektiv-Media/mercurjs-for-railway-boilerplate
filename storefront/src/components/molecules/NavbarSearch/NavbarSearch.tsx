"use client"

import { Input } from "@/components/atoms"
import { SearchIcon } from "@/icons"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { redirect } from "next/navigation"
import { useTranslations } from "next-intl"

export const NavbarSearch = ({
  placeholder,
}: {
  placeholder?: string
}) => {
  const searchParams = useSearchParams()

  const t = useTranslations("common")
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState(searchParams.get("query") || "")

  const resolvedPlaceholder = placeholder ?? t("searchClickfynd")

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search) {
      redirect(`/kategorier?query=${search}`)
    } else {
      redirect(`/kategorier`)
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
        placeholder={isFocused ? "" : resolvedPlaceholder}
        value={search}
        changeValue={setSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full rounded-full border-fuchsia-200 bg-fuchsia-50/60 text-center text-lg font-medium text-slate-900 placeholder:text-slate-500 focus:border-violet-300"
      />
      <input type="submit" className="hidden" />
    </form>
  )
}