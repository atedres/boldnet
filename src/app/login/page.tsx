'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FirebaseClientProvider, useAuth, useUser } from '@/firebase';
import {
  initiateEmailSignIn,
  initiateEmailSignUp,
} from '@/firebase/non-blocking-login';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

function AuthForm() {
  const [formMode, setFormMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleSignIn = () => {
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please enter both email and password.',
      });
      return;
    }
    initiateEmailSignIn(auth, email, password);
  };

  const handleSignUp = () => {
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please enter both email and password.',
      });
      return;
    }
    if (secretCode !== 'SUPERADMIN') {
      toast({
        variant: 'destructive',
        title: 'Invalid Secret Code',
        description: 'The secret code you entered is incorrect.',
      });
      return;
    }
    initiateEmailSignUp(auth, email, password);
  };
  
  if (isUserLoading || (!isUserLoading && user)) {
    return <div>Loading...</div>;
  }

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setSecretCode('');
  };

  const toggleMode = () => {
    resetForm();
    setFormMode(prevMode => prevMode === 'signin' ? 'signup' : 'signin');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        {formMode === 'signin' ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your admin account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={handleSignIn}>
                Sign in
              </Button>
              <Button variant="link" onClick={toggleMode}>
                Don't have an account? Create account
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                Enter your email, password, and the secret code to create an admin account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="secretCode">Secret Code</Label>
                <Input
                  id="secretCode"
                  type="password"
                  placeholder="Enter secret code"
                  required
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={handleSignUp}>
                Create Account
              </Button>
              <Button variant="link" onClick={toggleMode}>
                Already have an account? Sign in
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}


export default function LoginPage() {
  return (
    <FirebaseClientProvider>
      <AuthForm />
    </FirebaseClientProvider>
  );
}
