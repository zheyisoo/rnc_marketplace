import React from 'react';
import { Button } from '@/components/ui/button';
import Link from "next/link";

const LandingPage = () => {
    return (
        <div className="h-max pt-80 flex flex-col items-center justify-center">
        <p>
            <img src="logo.png" alt="Roast and Coffee Project Logo" style={{ width: '200px', height: 'auto' }} />
            </p>
            <div>
            <h1>Welcome to Roast and Coffee Project</h1>
            </div>
            <p>Discover the finest coffee beans and roasts from around the world.</p>
            <Button size="lg" className='my-4'>
                <Link href="/sign-in">
                    Login
                </Link>
          </Button>
        </div>
    );
};

export default LandingPage;


// import React from 'react';

// const LandingPage = () => {
//   return (
//     <div>
//       <h1>Welcome to the Page component!</h1>
//     </div>
//   );
// };

// export default LandingPage;
