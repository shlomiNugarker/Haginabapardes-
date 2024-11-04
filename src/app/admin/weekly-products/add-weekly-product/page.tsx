import { WeeklyProductsForm } from "@/cmps/WeeklyProductsForm";

export default async function AddWeeklyProduct() {
  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold mb-4">ערוך מוצר במשתלה</h2>
        <WeeklyProductsForm />
      </section>
    </>
  );
}
