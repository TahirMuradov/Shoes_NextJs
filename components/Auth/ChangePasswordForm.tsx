"use client";
import Link from "next/link";
import forgot from "@/public/forgoutPassword.png";
import logo from "@/public/İSTANBUL.png";
import Image from "next/image";
import { Locale } from "@/i18n-config";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Result from "@/types/ApiResultType";

const ChangePasswordForm: React.FC<{ lang: Locale; apiDomen: string | undefined; email: string; token: string }> = ({
  apiDomen,
  lang,
  email,
  token,
}) => {
  const route = useRouter();

  async function  Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const NewPassword = form.get("NewPassword");
    const RetryNewPassword = form.get("RetryNewPassword");

    if (NewPassword !== RetryNewPassword || !NewPassword || !RetryNewPassword) {
      Swal.fire({
        title: "Info!",
        text: "Yeni parolla yeni parolun təkrarı eyni deyil! Təkrar yazın.",
        icon: "info",
        confirmButtonText: "Ok",
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          document.querySelectorAll<HTMLInputElement>('input[type="password"]').forEach((input) => {
            input.value = ""; 
          });
        }
      });
    
    }

 const respons= await  fetch(
      `${apiDomen}api/Auth/ChangePasswordForTokenForgotPassword?Email=${encodeURIComponent(email)}&Token=${encodeURIComponent(
        token
      )}&NewPassword=${NewPassword}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          langCode: `${lang}`,
          "Accept-Language": `${lang}`,
        },
        cache: "no-store",
        method: "PUT",
      }
    )
 
        if (respons.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Şifrəniz uğurla dəyişdirildi!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((res) => {
            if (res.isConfirmed) {
              route.push("/");
            }
          });
        }else{
            const result:Result<null>=await respons.json()
            let errors = "<ul>";
            if (Array.isArray(result.messages)) {
            
                result.messages.forEach((message:string)=> {
                    errors += `<li>${message}</li>`;
                });
            } else if (result.message) {
             
                errors += `<li>${result.message}</li>`;
            }
            errors += "</ul>";
    
            Swal.fire({
                title: 'Error!',
                html: errors, 
                icon: 'error',
                confirmButtonText: 'Cool',
                allowEscapeKey:false,
                allowOutsideClick:false
            }).then(res => {
                if (res.isConfirmed) {
                  route.refresh();
                }
            });
        }
    
 
  }

  return (
    <div className="w-4/5 mx-auto my-3">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image className="" src={logo} alt="Logo" width={176} height={32} />
              </Link>
              <span className="mt-15 relative inline-block w-full">
                <Image width={640} height={480} src={forgot} alt="forgotpassword" />
              </span>
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">Change Password</h2>
              <form onSubmit={Submit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="NewPassword"
                      placeholder="Enter your new password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">Retry New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="RetryNewPassword"
                      placeholder="Enter your new password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Change Password"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-black transition hover:bg-opacity-90"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                    Daxil olmaq istəyirsiniz?{" "}
                    <Link href="/auth/register" className="text-primary">
                      Daxil ol
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
