
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Pencil, Save, KeyRound, LogOut, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AccountInfoProps {
  user: User;
  onSignOut: () => void;
}

const AccountInfo = ({ user, onSignOut }: AccountInfoProps) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone
        }
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      toast.success("Profile information updated successfully", {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />
      });
      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        toast.error(error.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully", {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />
      });
      setShowPasswordForm(false);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      toast.error("Failed to change password. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Account Information</h1>
          <p className="text-muted-foreground">
            View and update your personal information.
          </p>
        </div>
        <Button variant="destructive" onClick={onSignOut} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="bg-muted/50 dark:bg-rocket-gray-800/50">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Personal Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                className={`w-full ${isEditing ? "border-primary/50 focus:border-primary" : ""}`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                className={`w-full ${isEditing ? "border-primary/50 focus:border-primary" : ""}`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Your email is your login and cannot be changed here.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                className={`w-full ${isEditing ? "border-primary/50 focus:border-primary" : ""}`}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="mr-2">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors">
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)} 
                className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="bg-muted/50 dark:bg-rocket-gray-800/50">
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-4">Change your password or update your security settings.</p>
          {showPasswordForm ? (
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setNewPassword("");
                    setConfirmNewPassword("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleChangePassword}
                  disabled={isChangingPassword}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors"
                >
                  <KeyRound className="h-4 w-4" />
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowPasswordForm(true)}
              className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Change Password
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountInfo;
