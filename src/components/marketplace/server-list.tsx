import type { Dictionary } from '@/lib/dictionaries';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, HardDrive, MemoryStick, Zap } from 'lucide-react';

type ServerListProps = {
  dictionary: Dictionary;
};

const serverData = [
  {
    id: 'starter',
    specs: {
      cpu: '2 Cores',
      ram: '4 GB',
      storage: '80 GB SSD',
      bandwidth: '2 TB',
    },
    price: '15',
  },
  {
    id: 'dev_pro',
    specs: {
      cpu: '4 Cores',
      ram: '16 GB',
      storage: '320 GB SSD',
      bandwidth: '5 TB',
    },
    price: '45',
  },
  {
    id: 'beast',
    specs: {
      cpu: '8 Cores',
      ram: '32 GB',
      storage: '640 GB NVMe',
      bandwidth: '10 TB',
    },
    price: '90',
  },
];

export const ServerList = ({ dictionary }: ServerListProps) => {
  const d = dictionary.marketplace;

  return (
    <div className="grid animate-fade-in-up gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {serverData.map((server, index) => (
        <Card
          key={server.id}
          className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
        >
          <CardHeader>
            <CardTitle className="font-headline">
              {d.servers[server.id as keyof typeof d.servers].name}
            </CardTitle>
            <CardDescription>
              {d.servers[server.id as keyof typeof d.servers].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Cpu className="h-5 w-5 text-accent" />
                <span>
                  <span className="font-semibold text-foreground">
                    {server.specs.cpu}
                  </span>{' '}
                  {d.specs.cpu}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MemoryStick className="h-5 w-5 text-accent" />
                <span>
                  <span className="font-semibold text-foreground">
                    {server.specs.ram}
                  </span>{' '}
                  {d.specs.ram}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HardDrive className="h-5 w-5 text-accent" />
                <span>
                  <span className="font-semibold text-foreground">
                    {server.specs.storage}
                  </span>{' '}
                  {d.specs.storage}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-accent" />
                <span>
                  <span className="font-semibold text-foreground">
                    {server.specs.bandwidth}
                  </span>{' '}
                  {d.specs.bandwidth}
                </span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto flex flex-col items-start gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-headline text-3xl font-bold">
                ${server.price}
              </span>
              <span className="text-sm text-muted-foreground">
                {d.price_per_month}
              </span>
            </div>
            <Button
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
            >
              {d.lease_now}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
