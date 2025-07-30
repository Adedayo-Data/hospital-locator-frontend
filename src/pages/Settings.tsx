// src/pages/admin/Settings.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/ui/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SettingsPage = () => {
  // Profile states
  const [fullName, setFullName] = useState("Dayo Admin");
  const [email, setEmail] = useState("admin@example.com");

  // Map settings states
  const [lat, setLat] = useState("10.3157");
  const [lng, setLng] = useState("9.8452");
  const [zoom, setZoom] = useState("13");

  // Notification settings
  const [notifyReview, setNotifyReview] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(false);
  const [notifyErrors, setNotifyErrors] = useState(true);

  const handleProfileSave = () => {
    console.log("Saving profile:", { fullName, email });
    // TODO: API call to update admin profile
  };

  const handleMapSave = () => {
    console.log("Saving map settings:", { lat, lng, zoom });
    // TODO: API call to save map settings
  };

  const handleNotificationSave = () => {
    console.log("Saving notifications:", {
      notifyReview,
      notifyMessages,
      notifyErrors,
    });
    // TODO: API call to save notification preferences
  };

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
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button onClick={handleProfileSave} className="mt-4">
                Save Profile
              </Button>
            </div>
          </TabsContent>

          {/* MAP SETTINGS */}
          <TabsContent value="map">
            <div className="space-y-4 mt-6">
              <div>
                <Label>Default Latitude</Label>
                <Input value={lat} onChange={(e) => setLat(e.target.value)} />
              </div>
              <div>
                <Label>Default Longitude</Label>
                <Input value={lng} onChange={(e) => setLng(e.target.value)} />
              </div>
              <div>
                <Label>Zoom Level</Label>
                <Input value={zoom} onChange={(e) => setZoom(e.target.value)} />
              </div>
              <Button onClick={handleMapSave} className="mt-4">
                Save Map Settings
              </Button>
            </div>
          </TabsContent>

          {/* NOTIFICATIONS */}
          <TabsContent value="notifications">
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <Label>Notify when a new review is submitted</Label>
                <Switch checked={notifyReview} onCheckedChange={setNotifyReview} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Notify on system messages</Label>
                <Switch checked={notifyMessages} onCheckedChange={setNotifyMessages} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Notify on app errors</Label>
                <Switch checked={notifyErrors} onCheckedChange={setNotifyErrors} />
              </div>
              <Button onClick={handleNotificationSave}>
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
