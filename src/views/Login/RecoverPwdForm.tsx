import { useNavigate } from 'react-router-dom';
import './index.less';
import { useState } from 'react';
import { rqForgetPass } from '@/views/api/auth';

export default function RecoverPwdForm() {
  const [rqPassResult, setRqPassResult] = useState(false);
  const onRegister = async (e: any): Promise<void> => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password?.value;
    const res = await rqForgetPass(email, password);
    if (res.code === 1) {
      setRqPassResult(true);
    }
  };

  if (rqPassResult) {
    return <SuccessForm />;
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 shadow-lg p-10 rounded border">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>
        <form className="mt-8 space-y-6" method="POST" onSubmit={onRegister}>
          <div className="space-y-3 ">
            <div>
              <div>
                {
                  "Enter your user account's verified email address and we will send you a password reset link."
                }
              </div>
              <label className="relative block">
                <span className="sr-only">Email address</span>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Email address"
                />
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send password reset email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SuccessForm() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 shadow-lg p-10 rounded border">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-3 ">
            <div>
              <div>
                Check your email for a link to reset your password. If it doesn’t appear within a
                few minutes, check your spam folder.
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => navigate('/login')}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Return to sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
