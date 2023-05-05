import { useNavigate ,useLocation} from 'react-router-dom';
import './index.less';
import { resetpass } from '@/views/api/auth';

export default function ChangePwdForm() {
  const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');
    console.log("token",token)
  const onRegister = async (e: any): Promise<void> => {
    e.preventDefault();
   // const email = e.target.email.value;
    const password = e.target.newpassword?.value;
  //  console.log('email', email);
    console.log('password', password);
    const res = await resetpass( password, token);
    if (res.code === 1) {
      navigate('/login');
    }
  };

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
            Change Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" method="POST" onSubmit={onRegister}>
          <div className="space-y-3 ">
            <div>
              <label className="relative block">
                <span className="sr-only">Old Password</span>

                <input
                  id="oldpassword"
                  name="oldpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Old Password"
                />
              </label>
            </div>
            <div>
              <label className="relative block">
                <span className="sr-only">New Password</span>

                <input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="New Password"
                />
              </label>
            </div>
            <div>
              <label className="relative block">
                <span className="sr-only">Confirm New Password</span>

                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Confirm New Password"
                />
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
