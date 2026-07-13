import { IoSettingsOutline } from "react-icons/io5";

function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center gap-3">
        <IoSettingsOutline className="text-4xl text-blue-600" />

        <div>
          <h1 className="text-3xl font-bold">Settings</h1>

          <p className="text-gray-500">
            Customize your WorkDev experience.
          </p>
        </div>
      </div>

      <div className="space-y-6">

        {/* Language */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">
            Language
          </h2>

          <p className="mb-4 text-gray-500">
            Choose your preferred language.
          </p>

          <select className="w-full rounded-xl border p-3">
            <option value="id">🇮Indonesia</option>
            <option value="en">🇺English</option>
            <option value="jp">🇯日本語</option>
            <option value="kr">🇰한국어</option>
          </select>
        </div>

        {/* Theme */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">
            Theme
          </h2>

          <p className="mb-4 text-gray-500">
            Select your preferred appearance.
          </p>

          <div className="flex flex-col gap-3">

            <label>
              <input type="radio" name="theme" defaultChecked />
              <span className="ml-2">Light</span>
            </label>

            <label>
              <input type="radio" name="theme" />
              <span className="ml-2">Dark</span>
            </label>

            <label>
              <input type="radio" name="theme" />
              <span className="ml-2">System</span>
            </label>

          </div>

        </div>

      </div>
    </div>
  );
}

export default SettingsPage;