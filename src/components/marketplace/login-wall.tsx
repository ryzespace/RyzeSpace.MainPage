import Link from 'next/link';
import { Lock } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type LoginWallProps = {
  dictionary: Dictionary;
};

export const LoginWall = ({ dictionary }: LoginWallProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Lock className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="font-headline text-2xl">{dictionary.marketplace.authWall.title}</CardTitle>
          <CardDescription className="pt-2">{dictionary.marketplace.authWall.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#">{dictionary.marketplace.authWall.cta}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
