import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Package, User, MapPin, CreditCard, AlertTriangle } from 'lucide-react';

export default function OrderFormSkeleton() {
  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          <Skeleton className='h-8 w-64' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='space-y-6 md:col-span-2'>
            {/* Order Status Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <Skeleton className='h-6 w-40' />
                  <Skeleton className='h-6 w-24 rounded-full' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                  <div>
                    <Skeleton className='mb-2 h-4 w-24' />
                    <Skeleton className='h-5 w-20' />
                  </div>
                  <div>
                    <Skeleton className='mb-2 h-4 w-24' />
                    <Skeleton className='h-5 w-16' />
                  </div>
                  <div>
                    <Skeleton className='mb-2 h-4 w-32' />
                    <Skeleton className='h-5 w-20' />
                  </div>
                  <div>
                    <Skeleton className='mb-2 h-4 w-20' />
                    <Skeleton className='h-6 w-24' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Package className='h-5 w-5' />
                  <Skeleton className='h-6 w-32' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {/* Product Card Skeleton 1 */}
                  <div className='space-y-4'>
                    <div className='flex gap-4'>
                      <Skeleton className='h-20 w-20 rounded-md' />
                      <div className='flex-1 space-y-2'>
                        <Skeleton className='h-5 w-48' />
                        <Skeleton className='h-4 w-32' />
                        <div className='flex gap-4'>
                          <Skeleton className='h-4 w-16' />
                          <Skeleton className='h-4 w-20' />
                        </div>
                      </div>
                      <div className='space-y-2 text-right'>
                        <Skeleton className='h-5 w-16' />
                        <Skeleton className='h-4 w-12' />
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <Skeleton className='h-5 w-5 rounded' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  </div>

                  <Separator className='my-4' />

                  {/* Product Card Skeleton 2 */}
                  <div className='space-y-4'>
                    <div className='flex gap-4'>
                      <Skeleton className='h-20 w-20 rounded-md' />
                      <div className='flex-1 space-y-2'>
                        <Skeleton className='h-5 w-40' />
                        <Skeleton className='h-4 w-28' />
                        <div className='flex gap-4'>
                          <Skeleton className='h-4 w-16' />
                          <Skeleton className='h-4 w-20' />
                        </div>
                      </div>
                      <div className='space-y-2 text-right'>
                        <Skeleton className='h-5 w-16' />
                        <Skeleton className='h-4 w-12' />
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <Skeleton className='h-5 w-5 rounded' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  </div>

                  <Separator className='my-4' />

                  {/* Product Card Skeleton 3 */}
                  <div className='space-y-4'>
                    <div className='flex gap-4'>
                      <Skeleton className='h-20 w-20 rounded-md' />
                      <div className='flex-1 space-y-2'>
                        <Skeleton className='h-5 w-52' />
                        <Skeleton className='h-4 w-36' />
                        <div className='flex gap-4'>
                          <Skeleton className='h-4 w-16' />
                          <Skeleton className='h-4 w-20' />
                        </div>
                      </div>
                      <div className='space-y-2 text-right'>
                        <Skeleton className='h-5 w-16' />
                        <Skeleton className='h-4 w-12' />
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <Skeleton className='h-5 w-5 rounded' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Skeleton */}
          <div className='space-y-6 md:col-span-1'>
            {/* Customer Info Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  <Skeleton className='h-5 w-40' />
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-center'>
                  <Skeleton className='h-24 w-24 rounded-full' />
                </div>
                <div>
                  <Skeleton className='mb-1 h-4 w-12' />
                  <Skeleton className='h-5 w-32' />
                </div>
                <div>
                  <Skeleton className='mb-1 h-4 w-10' />
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-40' />
                  </div>
                </div>
                <div>
                  <Skeleton className='mb-1 h-4 w-16' />
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-28' />
                  </div>
                </div>
                <div>
                  <Skeleton className='mb-1 h-4 w-8' />
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MapPin className='h-5 w-5' />
                  <Skeleton className='h-5 w-32' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-4 w-1/2' />
                </div>
              </CardContent>
            </Card>

            {/* Payment Info Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CreditCard className='h-5 w-5' />
                  <Skeleton className='h-5 w-36' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <Skeleton className='h-4 w-12' />
                    <Skeleton className='h-4 w-20' />
                  </div>
                  <div className='flex justify-between'>
                    <Skeleton className='h-4 w-12' />
                    <Skeleton className='h-5 w-16 rounded-full' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Defective Products Alert Skeleton */}
            <Card className='border-red-200 bg-red-50'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-red-800'>
                  <AlertTriangle className='h-5 w-5' />
                  <Skeleton className='h-5 w-36' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
