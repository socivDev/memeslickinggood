
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subscriber } from "@/types";

interface SubscriberListProps {
  subscribers: Subscriber[];
}

const SubscriberList = ({ subscribers }: SubscriberListProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Newsletter Subscribers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscribers.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No subscribers yet</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Joined On</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b">
                    <td className="py-2">{subscriber.email}</td>
                    <td className="py-2">{new Date(subscriber.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriberList;
