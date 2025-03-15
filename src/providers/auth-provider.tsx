"use client"

import { useQuery } from "@tanstack/react-query"
import React, { type ReactNode, useEffect, useState } from "react"
import AuthService from "@/services/authService"
import type { MeResponse } from "@/interfaces/user/user.interface"

interface AuthContextType {
  user: MeResponse | null
}

const initialState: AuthContextType = {
  user: null,
}

export const AuthContext = React.createContext<AuthContextType>(initialState)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MeResponse | null>(null)

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: AuthService.me,
  })

  useEffect(() => {
    if (data) setUser(data)
  }, [data])

  const contextValue: AuthContextType = {
    user,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

