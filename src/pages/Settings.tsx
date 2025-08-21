// src/pages/Settings.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/ui/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface AdminSettings {
  profile: {
    fullName: string;
    email: string;
  };
  map: {
    lat: number;
    lng: number;
    zoom: number;
  };
  notifications: {
    notifyReview: boolean;
    notifyMessages: boolean;
    notifyErrors: boolean;
  };
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/settings", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch settings");
        const flatData = await response.json();

        // Transform the flat data from the backend into the nested structure the component expects.
        const nestedSettings: AdminSettings = {
          profile: {
            fullName: flatData.fullName || "",
            email: flatData.email || "",
          },
          map: {
            lat: flatData.lat || 0,
            lng: flatData.lng || 0,
            zoom: flatData.zoom || 13,
          },
          notifications: {
            notifyReview: flatData.notifyReview ?? false,
            notifyMessages: flatData.notifyMessages ?? false,
            notifyErrors: flatData.notifyErrors ?? false,
          },
        };
        setSettings(nestedSettings);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (
    section: keyof AdminSettings,
    field: string,
    value: string | number | boolean
  ) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    });
  };

  const handleSave = async (section: keyof AdminSettings) => {
    if (!settings) return;
    try {
      // Flatten the nested settings object to match the backend's expected flat structure
      const flatSettings = {
        ...settings.profile,
        ...settings.map,
        ...settings.notifications,
      };

      const response = await fetch("http://localhost:8080/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(flatSettings),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save settings: ${errorText}`);
      }
      console.log(`✅ Saved ${section} settings:`, settings[section]);
    } catch (err) {
      console.error("Save failed", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during save.");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto text-center">Loading settings...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto text-center text-red-500">
          Error: {error}
        </div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="map">Map Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* PROFILE */}
          <TabsContent value="profile">
            <div className="space-y-4 mt-6">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={settings.profile.fullName}
                  onChange={(e) =>
                    handleInputChange("profile", "fullName", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={settings.profile.email}
                  onChange={(e) => handleInputChange("profile", "email", e.target.value)}
                />
              </div>
              <Button onClick={() => handleSave("profile")} className="mt-4">
                Save Profile
              </Button>
            </div>
          </TabsContent>

          {/* MAP SETTINGS */}
          <TabsContent value="map">
            <div className="space-y-4 mt-6">
              <div>
                <Label>Default Latitude</Label>
                <Input
                  type="number"
                  value={settings.map.lat}
                  onChange={(e) =>
                    handleInputChange("map", "lat", parseFloat(e.target.value))
                  }
                />
              </div>
              <div>
                <Label>Default Longitude</Label>
                <Input
                  type="number"
                  value={settings.map.lng}
                  onChange={(e) =>
                    handleInputChange("map", "lng", parseFloat(e.target.value))
                  }
                />
              </div>
              <div>
                <Label>Zoom Level</Label>
                <Input
                  type="number"
                  value={settings.map.zoom}
                  onChange={(e) => handleInputChange("map", "zoom", parseInt(e.target.value, 10))}
                />
              </div>
              <Button onClick={() => handleSave("map")} className="mt-4">
                Save Map Settings
              </Button>
            </div>
          </TabsContent>

          {/* NOTIFICATIONS */}
          <TabsContent value="notifications">
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <Label>Notify when a new review is submitted</Label>
                <Switch
                  checked={settings.notifications.notifyReview}
                  onCheckedChange={(checked) =>
                    handleInputChange("notifications", "notifyReview", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Notify on system messages</Label>
                <Switch
                  checked={settings.notifications.notifyMessages}
                  onCheckedChange={(checked) =>
                    handleInputChange(
                      "notifications",
                      "notifyMessages",
                      checked
                    )
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Notify on app errors</Label>
                <Switch
                  checked={settings.notifications.notifyErrors}
                  onCheckedChange={(checked) => handleInputChange("notifications", "notifyErrors", checked)}
                />
              </div>
              <Button onClick={() => handleSave("notifications")}>
                Save Notification Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
