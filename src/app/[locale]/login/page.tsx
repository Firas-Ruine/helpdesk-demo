"use client"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useLogin } from "@/hooks/user/useLogin"
import { LoginRequest } from "@/interfaces/user/user.interface"
import Loader from "@/components/ui/loader"
import { useTranslations } from "next-intl"

export default function LoginPage() {
  const t = useTranslations()
    const {validationSchema,initialValues,showPassword,setShowPassword,login,isLoading} = useLogin()
  const handleSubmit = (values: LoginRequest) => {
    login(values)
  }
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block md:w-1/2 bg-primary-500"></div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t('login')}</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
              <Form className="space-y-6" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="login">Your login:</Label>
                  <Field
                    as={Input}
                    id="login"
                    name="login"
                    type="text"
                    placeholder="Your login"
                    className="w-full"
                  />
                  <ErrorMessage name="login" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Your password:</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-primary-500 hover:bg-primary-600">
                  {isLoading ? <Loader /> : "Login"}
                </Button>
                <div className="text-center mt-4">
                  <Link href="/" className="text-sm text-primary-500 hover:underline">
                    ← Back to Home
                  </Link>
                </div>
              </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}
