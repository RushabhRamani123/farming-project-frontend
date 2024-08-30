/* eslint-disable react/prop-types */
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function LoginForm({ flip }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post('https://ecommerce-backend-deploying.vercel.app/api/signin', {
        email: data.email,
        password: data.password
      })
      window.localStorage.setItem("token", response.data.token)
      toast({
        title: "Sign in successful",
        description: "Welcome back!",
      })
      navigate("/dashboard")
      window.location.reload()
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error.response?.data?.message || "An error occurred during sign in",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="email@example.com"
                    {...field}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-red-500 mt-1">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    {...field}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-red-500 mt-1">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-primary rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 ease-in-out"
            >
              {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
            <p className="text-sm">
              <span onClick={flip} className="text-primary hover:text-primary-dark cursor-pointer transition duration-200 ease-in-out">
                Sign up
              </span>
            </p>
          </div>
        </form>
      </Form>
    </div>
  </div>
  
  
  )
}