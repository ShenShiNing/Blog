"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion"; // 修正导入路径
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 表单状态类型
type FormStatus = "idle" | "submitting" | "success" | "error";

// 通用动画变体
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus("error");
      setErrorMessage("Please fill in all fields");
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send message");

      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
      setTimeout(() => {
        setFormStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  // 渲染按钮内容
  const renderButtonContent = () => {
    switch (formStatus) {
      case "submitting":
        return (
          <>
            <span className="mr-2">Sending...</span>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </>
        );
      case "success":
        return (
          <>
            <span className="mr-2">Sent!</span>
            <CheckCircle className="h-4 w-4" />
          </>
        );
      case "error":
        return (
          <>
            <span className="mr-2">Try Again</span>
            <AlertCircle className="h-4 w-4" />
          </>
        );
      default:
        return (
          <>
            <span className="mr-2">Send</span>
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        );
    }
  };

  // 渲染表单提示
  const renderAlert = () => {
    if (formStatus === "error") {
      return (
        <Alert variant="destructive" className="flex flex-row items-center">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="mt-[0.4rem]">
            {errorMessage}
          </AlertDescription>
        </Alert>
      );
    }
    if (formStatus === "success") {
      return (
        <Alert
          variant="default"
          className="mb-4 bg-green-500/10 text-green-500 border-green-500/20 flex flex-row items-center"
        >
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="mt-[0.3rem]">
            Your message has been sent successfully!
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="container max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold relative inline-block">
            Contact me
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle>Send message</CardTitle>
                <CardDescription>
                  Please fill in the form below, I will reply to you as soon as
                  possible
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {renderAlert()}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 focus:ring-2 focus:ring-primary transition-all"
                      disabled={
                        formStatus === "submitting" || formStatus === "success"
                      }
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 focus:ring-2 focus:ring-primary transition-all"
                      disabled={
                        formStatus === "submitting" || formStatus === "success"
                      }
                    />
                  </div>
                  <Textarea
                    name="message"
                    placeholder="Your message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    className="min-h-[120px] bg-background/50 focus:ring-2 focus:ring-primary transition-all"
                    disabled={
                      formStatus === "submitting" || formStatus === "success"
                    }
                  />
                </form>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className={`w-full group relative overflow-hidden ${
                    formStatus === "error"
                      ? "bg-destructive hover:bg-destructive/90"
                      : formStatus === "success"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-primary hover:bg-primary/90"
                  }`}
                  disabled={
                    formStatus === "submitting" || formStatus === "success"
                  }
                  onClick={handleSubmit}
                >
                  <motion.div
                    className={`absolute inset-0 ${
                      formStatus === "error"
                        ? "bg-destructive/90"
                        : formStatus === "success"
                          ? "bg-green-600"
                          : "bg-primary/90"
                    }`}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {renderButtonContent()}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
