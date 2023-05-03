import {useNavigate} from "react-router-dom";

export interface Props {
  handleSubmit: Function;
}
export default function SignInForm({ handleSubmit }: Props) {
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleSubmit(email, password);
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 shadow-lg p-10 rounded border">
        <div>
          <img
            className="mx-auto h-12 w-auto cursor-pointer"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            onClick={() => navigate('/customer/home')}
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>
        <form className="mt-8 space-y-6" method="POST" onSubmit={onSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Create account
              </a>
            </div>
          </div>
          <div className="space-y-3 ">
            <div>
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
            <div>
              <label className="relative block">
                <span className="sr-only">Password</span>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Password"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/*<input*/}
              {/*  id="remember-me"*/}
              {/*  name="remember-me"*/}
              {/*  type="checkbox"*/}
              {/*  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
              {/*/>*/}
              {/*<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">*/}
              {/*  Remember me*/}
              {/*</label>*/}
            </div>

            <div className="text-sm">
              <a href="recover-pass" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>

        <h3 className="mt-6 text-center tracking-tight text-gray-400">--- Or sign in with ---</h3>
      </div>
    </div>
  );
};
