import { Card } from "@/components/ui/card";
import { securityEvents } from "@/lib/data/catalog";

export default function AdminSocPage() {
  return (
    <div>
      <h1 className="font-serif text-5xl">SOC Dashboard</h1>
      <div className="mt-8 grid gap-4">
        {securityEvents.map((event) => (
          <Card key={event.id} className="p-6 text-black">
            <p className="text-sm font-medium">{event.type}</p>
            <p className="mt-2 text-sm">{event.details}</p>
            <p className="mt-3 text-xs text-black/60">{event.sourceIp} · {event.createdAt}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
