"use client";

import { FormEvent, useState } from "react";
import { services } from "@/data/services";
import { contact } from "@/data/brand";

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  if (!values.email.trim()) errors.email = "Please enter your work email.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address.";

  if (!values.company.trim()) errors.company = "Please enter your company name.";

  if (!values.service) errors.service = "Please select a service.";

  if (!values.message.trim()) errors.message = "Tell us a little about the project.";
  else if (values.message.trim().length < 20)
    errors.message = "Please add a few more details (at least 20 characters).";

  return errors;
}

const fieldClasses =
  "w-full rounded-lg border bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/35 transition-colors focus:outline-none focus:ring-2 focus:ring-red/40";

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // Prototype only — no backend is configured. This simulates a brief
    // submission state before confirming, without claiming an email sent.
    window.setTimeout(() => {
      setStatus("success");
    }, 700);
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-lg border border-border bg-mist p-8">
        <p className="text-h3 text-white">Thanks, {values.name.split(" ")[0] || "there"}.</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          This is a working prototype, so your message wasn&rsquo;t actually sent anywhere. In
          production this form will route directly to our team. For a real enquiry right now,
          please reach us at{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold text-white underline underline-offset-2">
            {contact.email}
          </a>{" "}
          or{" "}
          <a href={contact.phoneHref} className="font-semibold text-white underline underline-offset-2">
            {contact.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initialState);
            setStatus("idle");
          }}
          className="mt-6 text-sm font-semibold text-red hover:text-red-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <p className="text-xs text-muted">
        Prototype form — submissions are validated in your browser only and are not sent to a
        server.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-white">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${fieldClasses} mt-2 ${errors.name ? "border-red" : "border-border"}`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs font-medium text-red">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-white">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${fieldClasses} mt-2 ${errors.email ? "border-red" : "border-border"}`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs font-medium text-red">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="text-sm font-semibold text-white">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={handleChange("company")}
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? "company-error" : undefined}
          className={`${fieldClasses} mt-2 ${errors.company ? "border-red" : "border-border"}`}
        />
        {errors.company && (
          <p id="company-error" className="mt-1.5 text-xs font-medium text-red">
            {errors.company}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-semibold text-white">
          Service of interest
        </label>
        <select
          id="service"
          name="service"
          value={values.service}
          onChange={handleChange("service")}
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "service-error" : undefined}
          style={{ colorScheme: "dark" }}
          className={`${fieldClasses} mt-2 ${errors.service ? "border-red" : "border-border"}`}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {errors.service && (
          <p id="service-error" className="mt-1.5 text-xs font-medium text-red">
            {errors.service}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-white">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClasses} mt-2 resize-y ${errors.message ? "border-red" : "border-border"}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs font-medium text-red">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-2 inline-flex w-fit items-center gap-2.5 rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
