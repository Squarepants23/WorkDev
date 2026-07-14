import { IoSettingsOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center gap-3">
        <IoSettingsOutline className="text-4xl text-blue-600" />

        <div>
          <h1 className="text-3xl font-bold">{t("settings.title")}</h1>

          <p className="text-gray-500">Customize your WorkDev experience.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Language */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Language</h2>

          <p className="mb-4 text-gray-500">{t("settings.language")}</p>

          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="w-full rounded-xl border p-3"
          >
            <option value="id">🇮🇩 Indonesia</option>
            <option value="en">🇺🇸 English</option>
            <option value="jp">🇯🇵 日本語</option>
            <option value="kr">🇰🇷 한국어</option>
            <option value="ar">🇸🇦 العربية</option>
            <option value="ru">🇷🇺 Русский</option>
          </select>
        </div>

        {/* Theme */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">{t("settings.theme")}</h2>

          <p className="mb-4 text-gray-500">
            Select your preferred appearance.
          </p>

          <div className="flex flex-col gap-3">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="theme"
                checked={theme === "light"}
                onChange={() => setTheme("light")}
              />
              <span className="ml-2">☀️ Light</span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="theme"
                checked={theme === "dark"}
                onChange={() => setTheme("dark")}
              />
              <span className="ml-2">🌙 Dark</span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="theme"
                checked={theme === "system"}
                onChange={() => setTheme("system")}
              />
              <span className="ml-2">System</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
