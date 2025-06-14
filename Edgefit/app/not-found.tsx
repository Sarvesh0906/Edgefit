import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  redirectLink?: string;
  redirectMessage?: string;
}

const NotFound = ({
  redirectLink = '/',
  redirectMessage = 'Back to Home',
}: NotFoundProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-light via-white to-brand-light">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-brand-green mb-4">404</h1> 
          <h2 className="text-2xl font-semibold text-brand-dark mb-2">Page Not Found</h2>
          <p className="text-brand-dark/70">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="bg-brand-green hover:bg-brand-green/90 text-white w-full">
            <Link href={redirectLink}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {redirectMessage}
            </Link>
          </Button>

          <Button asChild variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white w-full">
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-gray">
          <p className="text-sm text-brand-dark/60">
            Need help? Our AI fitness team is here to assist you with your fitness journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
