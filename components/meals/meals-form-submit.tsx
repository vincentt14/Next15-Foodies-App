"use client";

import { useFormStatus } from "react-dom";

export default function MealsFormSubmit() {
  const { pending } = useFormStatus(); // hooks yang cuma ada di next.js buat kasi progres loading on going request

  return <button disabled={pending}>{pending ? "Submitting.." : "Share Meal"}</button>;
}
