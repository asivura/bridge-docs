import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface SystemCardProps {
  title: string;
  description: string;
  features: string[];
  href: string;
}

export function SystemCard({ title, description, features, href }: SystemCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
          {features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <a
          href={href}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View full system &rarr;
        </a>
      </CardFooter>
    </Card>
  );
}
