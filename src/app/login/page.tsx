import { SubmitButton } from "@/cmps/submit-button";
import { signIn } from "@/services/auth";
import { Form } from "@/cmps/Form";

export default function Login() {
  return (
    <div className="flex items-center justify-center bg-theme-light dark:bg-darkmode-theme-light min-h-screen">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-300 shadow-xl bg-white">
        <div className="flex flex-col items-center justify-center space-y-3 border-b px-6 py-8 text-center sm:px-12">
          <h3 className="text-2xl font-bold text-customNavy">התחברות</h3>
          <p className="text-sm text-gray-600">
            השתמש באימייל ובסיסמה שלך כדי להיכנס{" "}
          </p>
        </div>
        <Form
          action={async (formData: FormData) => {
            "use server";
            await signIn("credentials", {
              redirectTo: "/admin",
              email: formData.get("email") as string,
              password: formData.get("password") as string,
            });
          }}
        >
          <div className="p-6 sm:px-12">
            <SubmitButton>היכנס</SubmitButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
