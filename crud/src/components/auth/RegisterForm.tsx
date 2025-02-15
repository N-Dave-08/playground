import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeClosedIcon } from 'lucide-react';
import Link from 'next/link';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await register({ name, email, password });
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={`${showPassword ? 'text' : 'password'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
            {
              showPassword ? <Eye /> : <EyeClosedIcon />
            }
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <Button type="submit" className="w-full">
        Register
      </Button>
      <p className='flex gap-2 w-full justify-center text-sm'>Already have an account?
          <Link href={'/login'} className='text-info'>Log in</Link>
        </p>
    </form>
  );
}
