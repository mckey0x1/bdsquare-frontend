import { useAuth } from "@/context/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AdminAccessPanel() {
  const { admin, alladmins, updateAdminAccess } = useAuth(); // updateAdminAccess should call mutation

  if (admin?.email !== "bdsquare1@gmail.com") {
    return null; // Hide this section for non-super admins
  }

  return (
    <div className="space-y-4 p-4 border rounded-md shadow">
      <h2 className="text-xl font-semibold">Manage Admin Access</h2>

      {alladmins?.map((a) => (
        <div key={a.id} className="flex items-center justify-between">
          <div>
            <div className="font-medium">{a.email}</div>
            <div className="text-sm text-muted-foreground">ID: {a.id}</div>
          </div>
          <div className="flex items-center gap-2">
            <Label>Access</Label>
            <Switch
              checked={!!a.isAccess}
              onCheckedChange={(checked) => updateAdminAccess(a.id, checked)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
