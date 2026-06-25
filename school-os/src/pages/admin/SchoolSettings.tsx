import { useEffect, useState } from "react";
import api from "../../api/api";
import SchoolSettingsCard from "../../components/admin/settings/SchoolSettingsCard";

type Settings = {
  schoolName: string;
  schoolCode: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  logo: string;
};

const SchoolSettings = () => {
  const [settings, setSettings] = useState<Settings>();
  const fetchSettings = async () => {
    const res = await api.get("/api/school-settings");
    setSettings(res.data.data);
  };
  useEffect(() => {
    fetchSettings();
  }, []);
  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-textPrimary">School Settings</h1>

        <p className="mt-1 text-textSecondary">
          Configure school information, branding, contact details and principal
          information.
        </p>
      </div>

      {/* SETTINGS CARDS */}
      <div className="grid gap-6">
        <SchoolSettingsCard settings={settings} />
      </div>
    </div>
  );
};

export default SchoolSettings;
